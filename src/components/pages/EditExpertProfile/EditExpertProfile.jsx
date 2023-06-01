import s from './EditExpertProfile.module.scss'
import {Field, Form, Formik} from 'formik';
import {useEffect, useRef, useState} from "react";
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import {
  selectCurrentExpert,
  selectCurrentExpertId,
  selectFormIsSubmitting, selectWallet,
  sendExpert
} from "../../../store/reducers/dataReducer";
import {useDispatch, useSelector} from "react-redux";

const EditExpertProfile = () => {
  const expertId = useSelector(selectCurrentExpertId)
  const currentExpert = useSelector(selectCurrentExpert)
  const formIsSubmitting = useSelector(selectFormIsSubmitting)

  const onBackClick = () => {
    navigate('/role')
  }

  useEffect(() => {
    if (currentExpert) {
      if (currentExpert.expert.image) {
        refUser.current.style.backgroundImage = `url(${currentExpert.expert.image})`;
        refUser.current.style.borderRadius = '50%';
      }
    }
  }, [])

  let walletaddress
  const wallet = useSelector(selectWallet)
if (wallet) walletaddress = wallet.number

  const refUser = useRef(null);
  const [file, setFile] = useState(null)

  const fileChangeHandler = (e, setFieldValue) => {
    const file = e.target.files[0]
    const reader = new FileReader

    reader.readAsDataURL(file);
    reader.onload = function (e) { // Как только картинка загрузится
      refUser.current.style.backgroundImage = `url(${e.target.result})`;
      refUser.current.style.borderRadius = '50%';
    }

    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let initialValues
  if (currentExpert) {
    initialValues = {
      firstName: currentExpert.expert.name,
      secondName: currentExpert.expert.position,
      experience: currentExpert.expert.experience,
      courses: currentExpert.expert.learnDescription,
      telegram: '',
      twitter: '',
      instagram: '',
      website: '',
    }
  } else {
    initialValues = {
      firstName: '',
      secondName: '',
      experience: '',
      courses: '',
      telegram: '',
      twitter: '',
      instagram: '',
      website: '',
    }
  }
  return (
    <div className={s.container}>

      <Formik initialValues={initialValues}
              validate={values => {
                const errors = {};
                if (!values.firstName) {
                  errors.firstName = 'Required';
                }
                if (!values.secondName) {
                  errors.secondName = 'Required';
                }
                if (!values.courses) {
                  errors.courses = 'Required';
                }

                if (!values.experience) {
                  errors.experience = 'Required';
                }
                return errors;
              }}

              onSubmit={(values) => {
                const newExpertId = expertId ? expertId : Math.trunc(new Date().valueOf() / 1000)
                const sendData = {
                  expertId: newExpertId,
                  info: {
                    name: values.firstName,
                    position: values.secondName,
                    links: values.telegram + ' ' + values.instagram + ' ' + values.twitter + ' ' + values.website,
                    experience: values.experience,
                    learnDescription: values.courses,
                    telegram: values.telegram,
                    instagram: values.instagram,
                    twitter: values.twitter,
                    webSite: values.website,
                    address: walletaddress
                  }
                }
                dispatch(sendExpert({sendData, file}))
              }}
      >
        {({errors, touched, values}) => (
          <Form className={s.form}>
            <h1 className={s.title}>Tell us about you</h1>
            <div className={s.profileImageLabel}>Profile image</div>
            <div className={s.profileImageRecommend}>JPEG, PNG, GIF. Recommend 400x400. Max 5mb</div>
            <Field type="file" name="avatar" className={s.fileInput} id="file" onChange={fileChangeHandler}/>
            <label ref={refUser} className={s.fileInputLabel} htmlFor="file" style={{}}></label>

            <div className={s.topInputWrapper}>

              <Field type="text" name="firstName" placeholder="First Name" className={s.topInput}
                     style={{'borderColor': (errors.firstName && touched.firstName) ? 'red' : touched.firstName ? '#6B7280' : '#D1D5DB'}}
              />
              <Field type="text" name="secondName" placeholder="Second Name" className={s.topInput}
                     style={{'borderColor': (errors.secondName && touched.secondName) ? 'red' : touched.secondName ? '#6B7280' : '#D1D5DB'}}
              />
            </div>
            <div className={s.text}>
              Describe your experience
            </div>
            <div className={s.moreText}>What area are you an expert in?</div>

            <Field as="textarea" name="experience" placeholder="I am an Information Technology Specialist..."
                   className={s.textarea}
                   style={{'borderColor': (errors.experience && touched.experience) ? 'red' : touched.experience ? '#6B7280' : '#D1D5DB'}}
            />
            <div className={s.textAreaBottomLabel}>{values.experience.length}/200</div>

            <div className={s.text}>
              Describe what you teach
            </div>
            <Field as="textarea" name="courses" placeholder="Artificial intelligence for business..."
                   className={s.textarea}
                   style={{'borderColor': (errors.courses && touched.courses) ? 'red' : touched.courses ? '#6B7280' : '#D1D5DB'}}
            />
            <div className={s.textAreaBottomLabel}>{values.courses.length}/200</div>

            <div className={s.addLinksTitle}>Add links to your social media profiles</div>

            <div className={cn(s.socialInputWrapper, s.tg)}>
              <Field name="telegram" placeholder="Website URL" className={s.socialInput}
                     style={{'borderColor': values.telegram ? '#1F2937' : '#F3F4F6'}}
              />
            </div>

            <div className={cn(s.socialInputWrapper, s.twitter)}>
              <Field name="twitter" placeholder="Website URL" className={s.socialInput}
                     style={{'borderColor': values.twitter ? '#1F2937' : '#F3F4F6'}}
              />
            </div>

            <div className={cn(s.socialInputWrapper, s.instagram)}>
              <Field name="instagram" placeholder="Website URL" className={s.socialInput}
                     style={{'borderColor': values.instagram ? '#1F2937' : '#F3F4F6'}}
              />
            </div>

            <div className={cn(s.socialInputWrapper, s.website)}>
              <Field name="website" placeholder="Website URL" className={s.socialInput}
                     style={{'borderColor': values.website ? '#1F2937' : '#F3F4F6'}}
              />
            </div>

            <div className={s.formButtons}>
              <button className={s.backBtn} type="button" onClick={onBackClick}>Back</button>
              <button className={s.continueBtn} type="submit"
                      disabled={Object.keys(errors).length > 0 || Object.keys(touched).length === 0 || formIsSubmitting === true}>
                {formIsSubmitting ? 'Uploading' : 'Continue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditExpertProfile;
