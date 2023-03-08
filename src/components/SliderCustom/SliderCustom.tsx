import './style.scss';
import 'rsuite/dist/rsuite.min.css';
import { Slider } from 'rsuite';
import { formatNumber } from '../../helper/numberFormatter';

type Props = {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
  setValue: (value: number) => void;
};

export default function SliderCustom({
  defaultValue,
  title,
  min,
  max,
  setValue,
}: Props) {
  return (
    <div className='slider-custom'>
      <div className='slider-custom__title'>{title}</div>
      <div className='slider-custom__min-max'>
        <span>IDR {formatNumber(min)}</span>
        <span>IDR {formatNumber(max)}</span>
      </div>
      <Slider
        progress
        min={min}
        step={10000}
        max={max}
        defaultValue={defaultValue}
        value={defaultValue}
        onChange={(value) => {
          setValue(value as number);
        }}
      />
    </div>
  );
}
