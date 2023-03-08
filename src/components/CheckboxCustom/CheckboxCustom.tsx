import './style.scss';
import { Checkbox, CheckboxGroup } from 'rsuite';
import { IAwardType } from '../../interfaces/AwardTypeInterface';

type Props = {
  title: string;
  data: IAwardType[];
  value: number[];
  setValue: (value: number[]) => void;
};

export default function CheckboxCustom({
  title,
  data,
  value,
  setValue,
}: Props) {
  const dataIds = [1, 2, 3];
  const handleCheckAll = (value: number | undefined, checked: boolean) =>
    setValue(checked ? dataIds : []);
  const handleChange = (value: number[]) => setValue(value);

  return (
    <div className='checkbox-custom'>
      <div className='checkbox-custom__title'>{title}</div>
      <Checkbox
        indeterminate={value.length > 0 && value.length < data.length}
        checked={value.length === data.length}
        onChange={(e) => {
          const n = e as number;
          handleCheckAll(n, !value.includes(n));
        }}
      >
        All type
      </Checkbox>
      <CheckboxGroup
        name='checkboxList'
        value={value}
        onChange={(e) => {
          const n = e as number[];
          handleChange(n);
        }}
      >
        {data.map((item) => (
          <Checkbox key={item.id} value={item.id}>
            {item.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
