import React from 'react';
import LogingForm from '../components/LogingForm';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

export default function LogingPage() {
  const { isLoading } = useAuth();
  return (
    <div>
         {isLoading && <Loading />}
        <LogingForm/>
    </div>
  )
}
