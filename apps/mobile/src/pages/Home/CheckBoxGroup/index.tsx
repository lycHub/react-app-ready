import React, { forwardRef, Key, Ref } from 'react';
import './index.scoped.scss';
import { SelectOption, TypeWithNull } from '@app-ready/libs';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { useSafeState } from 'ahooks';
import { NativeProps } from 'antd-mobile/es/utils/native-props';

interface Props<T> extends NativeProps {
  id: string;
  options: SelectOption[];
  value: T[];
  onChange: (value: T[]) => void;
}

export type CheckboxRef = {
  nativeElement: TypeWithNull<HTMLDivElement>;
}

function CheckboxGroupInner<T = Key>({ id, className, options, value, onChange, ...rest }: Props<T>, ref: Ref<CheckboxRef>) {
  const [innerValue, setInnerValue] = useSafeState<T[]>([]);

  const nativeRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeRef.current;
    },
  }));

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  function onClick(event: T) {
    if (innerValue.includes(event)) {
      onChange(innerValue.filter(item => item !== event));
    } else {
      onChange([...innerValue, event]);
    }
  }


  return <div id={id} className={`checkbox-group ${className || ''}`} ref={nativeRef} {...rest}>
    {
      options.map(item => <div key={item.value} className={`checkbox-item ${innerValue.includes(item.value as T) ? 'checked' : ''}`} onClick={() => { onClick(item.value) }}>
        <div className="checkbox-circle" />
        <div>{item.label}</div>
      </div>)
    }
  </div>
}

const CheckboxGroup = forwardRef<CheckboxRef, Props<Key>>(CheckboxGroupInner);

CheckboxGroup.displayName = 'CheckboxGroup';
export default CheckboxGroup;