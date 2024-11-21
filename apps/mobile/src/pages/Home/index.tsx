import { useEffect } from 'react';
import './style.scoped.scss';
import { motion } from 'framer-motion';
import RadioGroup from './RadioGroup';
import CheckboxGroup from './CheckBoxGroup';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  name: number;
  hobby: number[];
}

const Mock = [
  {
    label: '选项一',
    value: 1
  },
  {
    label: '选项二',
    value: 2
  },
  {
    label: '选项三',
    value: 3
  },
];
function Home() {

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    // criteriaMode: 'all',
    // shouldFocusError: false,
    defaultValues: {
      name: void 0,
      hobby: [],
    }
  });

  function onSubmit(data: FormValues) {
    console.log("onSubmit :>> ", data);
  }

  function onReset() {
    reset();
  }

  useEffect(() => {
    console.log('errors>>', errors)
  }, [errors]);

  return (
    <motion.div
      className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <label className="form-label" htmlFor="name">
            姓名：<span style={{ color: 'red' }}>请选择</span>
          </label>
          <Controller
            control={control}
            name="name"
            rules={{
              required: '请选择'
            }}
            render={({
              field: { onChange, value }
            }) => (
              <RadioGroup id="name" options={Mock} value={value} onChange={onChange} />
            )}
          />
        </div>

        <div className="form-item">
          <label className="form-label" htmlFor="hobby">
            爱好：<span hidden={!errors.hobby} style={{ color: 'red' }}>请选择</span>
          </label>
          <Controller
            control={control}
            name="hobby"
            rules={{
              required: '请选择爱好',
            }}
            render={({
              field: { onChange, value }
            }) => (
              <CheckboxGroup id="hobby" options={Mock} value={value} onChange={onChange} />
            )}
          />
        </div>

        <div className="btn-group">
          <button type="button" onClick={onReset}>reset</button>
          <button type="submit">submit</button>
        </div>
      </form>


    </motion.div>
  )
}

Home.displayName = 'Home';
export default Home;