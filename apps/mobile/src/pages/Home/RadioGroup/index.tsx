import React, { forwardRef, Key, Ref, useImperativeHandle, useRef } from 'react';
import './index.scoped.scss';
import { SelectOption, TypeWithNull } from '@app-ready/libs';
import { NativeProps } from 'antd-mobile/es/utils/native-props';

interface Props<T> extends NativeProps {
  id: string;
  options: SelectOption[];
  value: T;
  onChange: (value: T) => void;
}

export type RadioRef = {
  nativeElement: TypeWithNull<HTMLDivElement>;
}

function RadioGroupInner<T = Key>({ id, className, options, value, onChange }: Props<T>, ref: Ref<RadioRef>) {
  const nativeRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeRef.current;
    },
  }));

  return <div id={id} className={`radio-group ${className || ''}`} ref={nativeRef}>
    {
      options.map(item => <div key={item.value} className={`radio-item ${value === item.value ? 'checked' : ''}`} onClick={() => { onChange(item.value as T) }}>
        <div className="radio-circle" />
        <div>{item.label}</div>
      </div>)
    }
  </div>
}

const RadioGroup = forwardRef<RadioRef, Props<Key>>(RadioGroupInner);
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;