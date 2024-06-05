import {useEffect, useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import { useStateContext } from '../context'
import { ethers } from 'ethers'

const NewRequest = () => {

  const [form,setForm] = useState({
    description: '',
    value: '',
    recipient: '',
  });

  const {state} = useLocation()

  const navigate = useNavigate();

  const {createRequest,address} = useStateContext()

  const [loading,setLoading] = useState(false)

  function handleFormChange(fieldName,e){
    setForm({...form,[fieldName] : e.target.value});
  }
  
  async function handleSubmit(e){
    e.preventDefault()
     
    setLoading(true)
    await createRequest({pId: state.pId,...form, value: ethers.utils.parseUnits(form.value,18)})
    setLoading(false)
    navigate(`/fundraiser-details/${state.title}/requests`,{state: state});
  }

  return (
    <section className='max-w-[555px] mx-auto mt-4 w-full'>
        {loading && <Loader />}
        <button onClick={() => navigate(`/fundraiser-details/${state.title}/requests`,{state: state})} className='text-sm text-primary'>← Back to Requests</button>
        <h2 className='text-xl md:text-[28px] text-center md:text-left text-slate-700 font-medium mt-6 mb-4'>Create a New Fund Request 💸</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 form-shadow p-4'>
            <FormField
                labelName="Request Description"
                value={form.description}
                handleChange={(e) => handleFormChange('description',e)} 
                isTextArea={true}
            />
            <FormField
                labelName="Amount in Ether"
                inputType="number"
                step="0.01"
                value={form.value}
                handleChange={(e) => handleFormChange('value',e)} 
            />
            <FormField
                labelName="Recipient Wallet Address"
                inputType="text"
                value={form.recipient}
                handleChange={(e) => handleFormChange('recipient',e)} 
            />
            <CustomButton disabled={!state} text="Create New Request" btnType="submit" />
        </form>
    </section>
  )
}

export default NewRequest