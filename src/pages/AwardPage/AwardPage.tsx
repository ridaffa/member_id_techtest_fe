import './style.scss';

import PageHeader from '../../components/PageHeader/PageHeader';
import { RootState } from '../../stores';
import { useDispatch, useSelector } from 'react-redux';
import {
  AwardPaginationDispatch,
  fetchAwardsPagination,
} from '../../stores/slices/awardSlice';
import { useEffect, useState } from 'react';
import { IAwardFindPagination } from '../../interfaces/PaginationInterface';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { IAward } from '../../interfaces/AwardInterface';
import { IResponse } from '../../interfaces/ResponseInterface';
import { toast, Toaster } from 'react-hot-toast';
import Card from '../../components/Card/Card';
import { formatNumber } from '../../helper/numberFormatter';
import Modal from '../../components/Modal/Modal';
import SelectedText from '../../components/SelectedText/SelectedText';
import SliderCustom from '../../components/SliderCustom/SliderCustom';
import CheckboxCustom from '../../components/CheckboxCustom/CheckboxCustom';
import Button from '../../components/Button/Button';
import { IAwardType } from '../../interfaces/AwardTypeInterface';

//hardcoded award type
const awardTypes: IAwardType[] = [
  { id: 1, name: 'Vouchers' },
  { id: 2, name: 'Products' },
  { id: 3, name: 'Others' },
];

//hardcoded min max point
const MIN = 10000;
const MAX = 2000000;

export default function AwardPage() {
  const cookie = useCookies(['jwt'])[0];
  const removeCookie = useCookies(['jwt'])[2];
  const { pagination, paginationLoading } = useSelector(
    (state: RootState) => state.awardPagination
  );
  const [pageContent, setPageContent] = useState<IAward[]>([]);
  const awardDispatch: AwardPaginationDispatch = useDispatch();
  const [maxParam, setMaxParam] = useState(MAX);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const textTypes = selectedTypes.map((item) => {
    const n = awardTypes.find((type) => type.id === item);
    return n?.name;
  });
  const joinedTextTypes = textTypes.join(', ');
  const [param, setParam] = useState<IAwardFindPagination>({
    jwt: cookie?.jwt,
    page: 1,
    limit: 3,
    minPoint: MIN,
    maxPoint: MAX,
    awardTypes: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const resetPoinParam = () => {
    setMaxParam(MAX);
  };
  const resetTypesParam = () => {
    setSelectedTypes([]);
  };
  const handleFilter = () => {
    setShowFilter(true);
  };
  const fetchAwards = () => {
    awardDispatch(fetchAwardsPagination(param))
      .then((res) => {
        if (res.payload === 'unauthorized') {
          removeCookie('jwt');
          return <Navigate to={'/'} />;
        }
        if (typeof res.payload === 'string') {
          throw new Error(res.payload);
        }
        res.payload as IResponse;
        return res.payload;
      })
      .then((res) => {
        if (res) {
          const n = res as IResponse;
          setPageContent((prev) => {
            return [...prev, ...n.message.data];
          });
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const handleFilterSubmit = () => {
    setParam((prev) => {
      return {
        ...prev,
        page: 1,
        maxPoint: maxParam,
        awardTypes: selectedTypes,
      };
    });
    setPageContent([]);
    setShowFilter(false);
  };
  useEffect(() => {
    const abort = new AbortController();
    fetchAwards();
    return () => abort.abort();
  }, [param]);

  //infinte scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) <
        document.documentElement.offsetHeight
      )
        return;
      if (pagination?.total_pages === pagination?.current_page) return;
      if (pagination?.data.length < param.limit) return;
      setParam((prev) => {
        return {
          ...prev,
          page: prev.page + 1,
        };
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pagination]);

  return (
    <div className='page awards'>
      {showFilter ? (
        <Modal title='Filter' setShowModal={setShowFilter}>
          {maxParam !== MAX ? (
            <SelectedText
              onClose={resetPoinParam}
              type='close'
              text={`Poin: 10000 - ${maxParam}`}
            />
          ) : null}
          {selectedTypes.length > 0 ? (
            <SelectedText
              onClose={resetTypesParam}
              type='close'
              text={`Type: ${joinedTextTypes}`}
            />
          ) : null}
          {}
          <SliderCustom
            setValue={setMaxParam}
            title='Poin Needed'
            min={MIN}
            max={MAX}
            defaultValue={maxParam}
          />
          <CheckboxCustom
            value={selectedTypes}
            setValue={setSelectedTypes}
            data={awardTypes}
            title='Awards Type'
          />
          <Button
            onClick={handleFilterSubmit}
            type='button'
            text='Filter'
            className='blue'
          ></Button>
        </Modal>
      ) : null}
      <Toaster />
      <PageHeader onClickStrawberry={handleFilter} title='Awards' />
      <div className='page__content'>
        {pageContent.map((award, index) => {
          return (
            <Card
              key={index}
              title={award?.product?.name || award?.voucher?.name || ''}
              type={award.award_type.name}
              point={`${formatNumber(award.points)} Poin`}
              image={award.image}
            ></Card>
          );
        })}
        {paginationLoading ? <div>Loading...</div> : null}
        {pagination.data.length === 0 &&
        paginationLoading === false &&
        pageContent.length === 0 ? (
          <div>No data</div>
        ) : null}
      </div>
    </div>
  );
}
