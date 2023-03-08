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

export default function AwardPage() {
  const cookie = useCookies(['jwt'])[0];
  const removeCookie = useCookies(['jwt'])[2];
  const { pagination, paginationLoading, paginationError } = useSelector(
    (state: RootState) => state.awardPagination
  );
  const [pageContent, setPageContent] = useState<IAward[]>([]);
  const awardDispatch: AwardPaginationDispatch = useDispatch();
  const [param, setParam] = useState<IAwardFindPagination>({
    jwt: cookie?.jwt,
    page: 1,
    limit: 10,
    minPoint: 0,
    maxPoint: 10000000,
    awardTypes: [],
  });
  useEffect(() => {
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
          setPageContent(n.message.data);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);
  return (
    <div className='page awards'>
      <Toaster />
      <PageHeader title='Awards' />
      <div className='page__content'>
        {pageContent.map((award) => {
          return (
            <Card
              key={award.id}
              title={award?.product?.name || award?.voucher?.name || ''}
              type={award.award_type.name}
              point={`${formatNumber(award.points)} Poin`}
              image={award.image}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
