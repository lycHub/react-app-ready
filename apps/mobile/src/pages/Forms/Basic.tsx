import React, { useCallback, useEffect } from "react";
import { unstable_usePrompt as usePrompt } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, Input, Stepper, TextArea } from "antd-mobile";
import { ErrorMessage } from "@hookform/error-message";
import ErrorMsgRender from "../../components/ErrorMsgRender";
import { useSafeState } from "ahooks";

type FormValues = {
  name: string
  age: number | null;
  job: string;
  hobby: string[];
  address: string;
}

function Basic() {
  // https://react-hook-form.com/docs/useform
  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    // criteriaMode: 'all',
    defaultValues: {
      name: '',
      age: null,
      job: '',
      hobby: [],
      address: '',
    }
  });
  const [block, setBlock] = useSafeState(false);
  const lockHandler = useCallback((event: BeforeUnloadEvent) => {
    event.returnValue = '离开？';
    return false;
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => { // type, ...rest
      // @ts-ignore
      const res = !!value[name || 'name'];
      setBlock(res);
      if (res) {
        addEventListener('beforeunload', lockHandler);
      } else {
        removeEventListener('beforeunload', lockHandler);
      }
    })
    return () => {
      subscription.unsubscribe()
      removeEventListener('beforeunload', lockHandler);
    }
  }, [watch]);

  function onSubmit(data: FormValues) {
    console.log("onSubmit :>> ", data);
    setBlock(false);
  }

  function onReset() {
    setBlock(false);
    reset();
  }

  usePrompt({
    when: block,
    message: `Are you sure you want to leave?`
  });
  return (
    <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
      {/* <Prompt when={block} message={`Are you sure you want to leave?`} /> */}
      <p>blockRef: {block.toString()}</p>
      <div className="form-item">
        <label className="form-label" htmlFor="name">
          姓名：
        </label>
        <Controller
          control={control}
          name="name"
          rules={{
            required: '请输入姓名',
            minLength: {
              value: 3,
              message: '至少3个字符'
            },
            pattern: {
              value: /bob/,
              message: '必须包含bob'
            }
          }}
          render={({
            field: { onChange, onBlur, value, name, ref }
          }) => (
            <div className="form-control">
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message, messages }) => <ErrorMsgRender message={message} messages={messages} />}
              />
            </div>
          )}
        />
      </div>
      <div className="form-item">
        <label className="form-label" htmlFor="age">
          年龄：
        </label>
        <Controller
          control={control}
          name="age"
          rules={{
            required: '请输入年龄',
            min: {
              value: 10,
              message: '年龄不能小于10'
            },
            max: {
              value: 20,
              message: '年龄不能大于20'
            }
          }}
          render={({
            field: { onChange, onBlur, value, name, ref }
          }) => (
            <div className="form-control">
              <Stepper
                allowEmpty={true}
                min={10}
                max={20}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message, messages }) => <ErrorMsgRender message={message} messages={messages} />}
              />
            </div>
          )}
        />
      </div>

      <div className="form-item">
        <label className="form-label" htmlFor="job">
          职业：
        </label>
        <Controller
          control={control}
          name="job"
          rules={{
            required: '请输入职业',
          }}
          render={({
            field: { onChange, onBlur, value, name, ref }
          }) => (
            <div className="form-control">
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message, messages }) => <ErrorMsgRender message={message} messages={messages} />}
              />
            </div>
          )}
        />
      </div>
      <div className="form-item">
        <label className="form-label" htmlFor="hobby">
          爱好：
        </label>
        <Controller
          control={control}
          name="hobby"
          rules={{
            required: '请选择爱好',
          }}
          render={({
            field: { onChange, value, name }
          }) => (
            <div className="form-control">
              <Checkbox.Group
                value={value}
                onChange={onChange}>
                <Checkbox value='apple'>苹果</Checkbox>
                <Checkbox value='orange'>橘子</Checkbox>
                <Checkbox value='banana'>香蕉</Checkbox>
              </Checkbox.Group>
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message, messages }) => <ErrorMsgRender message={message} messages={messages} />}
              />
            </div>
          )}
        />
      </div>

      <div className="form-item">
        <label className="form-label" htmlFor="address">
          住址：
        </label>
        <Controller
          control={control}
          name="address"
          rules={{
            required: '请输入住址',
            maxLength: {
              value: 100,
              message: '最多100个字符'
            }
          }}
          render={({
            field: { onChange, onBlur, value, name, ref }
          }) => (
            <div className="form-control">
              <TextArea
                value={value}
                maxLength={100}
                onChange={onChange}
                placeholder='请输入内容'
                autoSize={{ minRows: 3, maxRows: 5 }}
                ref={ref}
                onBlur={onBlur}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message, messages }) => <ErrorMsgRender message={message} messages={messages} />}
              />
            </div>
          )}
        />
      </div>
      <div className="btn-group">
        <button type="button" onClick={onReset}>reset</button>
        <button type="submit">submit</button>
      </div>
    </form>
  );
}
Basic.displayName = 'Basic';
export default Basic;
