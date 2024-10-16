import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RegisterProgress from '../components/registration/RegisterProgress';
import RegistrationStep1 from '../components/registration/RegistrationStep1';
import RegistrationStep2 from '../components/registration/RegistrationStep2';
import RegistrationStep3 from '../components/registration/RegistrationStep3';
import RegistrationStep4 from '../components/registration/RegistrationStep4';

const RegistrationForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // 전체 폼 데이터를 하나의 state로 관리
  const [formData, setFormData] = useState({
    auctionType: '', // 경매타입('실시간 경매')
    category: '',
    subcategory: '',
    productName: '',
    productDescription: '',
    startingPrice: '',
    startingLocalDateTime: '',
    endingLocalDateTime: '',
    bidIncrement: '',
    shippingMethod: '택배', // 배송방법 ('택배', '우편', '직거래')
    costResponsibility: '선불', // 비용부담 ('선불', '착불')
    instantPurchaseEnabled: false, // 즉시구매 가능 여부
    instantPurchasePrice: '', // 즉시구매 가격
    autoReauctionEnabled: false, // 자동재경매 여부
    reauctionStartingPrice: '', // 재경매 시작가
    thumbnail: '',
    additionalImages: []
  });

  // 스텝을 URL에 맞춰서 업데이트
  const stepMap = {
    '/registration/step1': 1,
    '/registration/step2': 2,
    '/registration/step3': 3,
    '/registration/step4': 4,
  };

  const [currentStep, setCurrentStep] = useState(stepMap[location.pathname] || 1);

  useEffect(() => {
    setCurrentStep(stepMap[location.pathname] || 1);
  }, [location.pathname]);


  const nextStep = () => {
    const nextStepNum = currentStep + 1;
    navigate(`/registration/step${nextStepNum}`);
  };

  const prevStep = () => {
    const prevStepNum = currentStep - 1;
    if (prevStepNum >= 1) {
      navigate(`/registration/step${prevStepNum}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RegistrationStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <RegistrationStep2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <RegistrationStep3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <RegistrationStep4 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <RegisterProgress activeStep={currentStep - 1} />
      {renderStep()}
    </div>
  );
};

export default RegistrationForm;
