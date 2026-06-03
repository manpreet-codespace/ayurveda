import React, { useState } from 'react'
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';

const ContactForm = () => {

    const initialFormData = {
        name: "",
        email: "",
        subject: "",
        phNumber: "",
        message: "",
    };

    const [formData, setFormData] = useState({
        ...initialFormData,
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendData = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${API_BASE_URL}/contact`, formData);
            console.log(response.data.data);
            setFormData(initialFormData);
            setMessage("Inquiry submitted successfully.");
        } catch (err) {
            console.log(err.response?.data || err.message);
            setMessage("Unable to submit inquiry.");

        }


    }




    return (
        <>
            <section className='w-6/12 mx-auto text-center bg-gray-100 p-5'>
                <h1 className='font-semibold text-lg py-5'>Contact Form</h1>
                <p className='italic'>If you have any query then feel free to ask us anything you want!</p>
                <br />
                {message && <p className='text-sm text-green-700'>{message}</p>}
                <form className='text-left w-11/12 mx-auto' onSubmit={handleSendData}>
                    <label htmlFor="name">
                        Your Name
                    </label><span className='text-red-600 font-bold'>*</span>
                    <br />
                    <input type='text'
                        name='name'
                        placeholder='Write your name'
                        className='bg-white p-2 border border-gray-400 w-full'
                        onChange={handleChange}
                        value={formData.name} />

                    <br /><br />
                    <label htmlFor="email">
                        Your Email
                    </label><span className='text-red-600 font-bold'>*</span>
                    <br />
                    <input
                        type='text'
                        name='email'
                        placeholder='Write your Email'
                        className='bg-white p-2 border border-gray-400 w-full'
                        onChange={handleChange}
                        value={formData.email} />

                    <br /><br />

                    <label htmlFor="subject">
                        Your Subject
                    </label>
                    <br />
                    <input
                        type='text'
                        name='subject'
                        placeholder='Write your Subject'
                        className='bg-white p-2 border border-gray-400 w-full'
                        onChange={handleChange}
                        value={formData.subject} />

                    <br /> <br />

                    <label htmlFor="phNumber">
                        Your Phone Number
                    </label>
                    <br />
                    <input
                        type='tel'
                        name='phNumber'
                        placeholder='Write your Phone Number'
                        className='bg-white p-2 border border-gray-400 w-full'
                        onChange={handleChange}
                        value={formData.phNumber} />
                    <br /><br />

                    <label htmlFor="message">
                        Your Message
                    </label><span className='text-red-600 font-bold'>*</span>
                    <br />
                    <textarea name='message' placeholder='Write your message' className='bg-white p-2 border border-gray-400 w-full' rows={5}
                        onChange={handleChange}
                        value={formData.message} ></textarea>

                    <br /><br />

                    <button type='submit' className='bg-black text-white rounded-lg px-4 py-2'>Send </button>
                </form>
            </section>

        </>
    )
}

export default ContactForm
