import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiX, FiCheck } from 'react-icons/fi';

// Mock symptom data - in a real app, this would come from an API
const SYMPTOMS = [
  { id: 1, name: 'Fever', category: 'General' },
  { id: 2, name: 'Headache', category: 'Head' },
  { id: 3, name: 'Cough', category: 'Respiratory' },
  { id: 4, name: 'Fatigue', category: 'General' },
  { id: 5, name: 'Nausea', category: 'Digestive' },
  { id: 6, name: 'Dizziness', category: 'Neurological' },
  { id: 7, name: 'Sore throat', category: 'Throat' },
  { id: 8, name: 'Shortness of breath', category: 'Respiratory' },
];

const SymptomChecker = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const filteredSymptoms = SYMPTOMS.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => {
      const isSelected = prev.some(s => s.id === symptom.id);
      if (isSelected) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const removeSymptom = (symptomId) => {
    setSelectedSymptoms(prev => prev.filter(s => s.id !== symptomId));
  };

  const checkSymptoms = () => {
    // In a real app, this would call an API to analyze symptoms
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{t('symptomChecker.title', 'Symptom Checker')}</h2>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('symptomChecker.searchPlaceholder', 'Search symptoms...')}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {t('symptomChecker.selectedSymptoms', 'Selected Symptoms')}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map(symptom => (
              <span
                key={symptom.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {symptom.name}
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-700 hover:bg-blue-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Symptom List */}
      <div className="mb-4 max-h-60 overflow-y-auto">
        {filteredSymptoms.map(symptom => (
          <div
            key={symptom.id}
            onClick={() => toggleSymptom(symptom)}
            className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              selectedSymptoms.some(s => s.id === symptom.id) ? 'bg-blue-50' : ''
            }`}
          >
            <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
              selectedSymptoms.some(s => s.id === symptom.id) 
                ? 'bg-blue-500 border-blue-500 text-white' 
                : 'border-gray-300'
            }`}>
              {selectedSymptoms.some(s => s.id === symptom.id) && <FiCheck className="w-3 h-3" />}
            </div>
            <div>
              <div className="font-medium">{symptom.name}</div>
              <div className="text-xs text-gray-500">{symptom.category}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={checkSymptoms}
        disabled={selectedSymptoms.length === 0}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
          selectedSymptoms.length > 0
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {t('symptomChecker.checkButton', 'Check Symptoms')}
      </button>

      {/* Results */}
      {showResults && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">{t('symptomChecker.results', 'Possible Conditions')}:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {selectedSymptoms.length > 0 ? (
              <>
                <li>Common Cold</li>
                <li>Influenza (Flu)</li>
                <li>COVID-19</li>
                <li className="mt-2 text-sm text-gray-600">
                  {t('symptomChecker.consultDoctor', 'Please consult a healthcare professional for accurate diagnosis.')}
                </li>
              </>
            ) : (
              <li>{t('symptomChecker.selectSymptoms', 'Please select symptoms to check')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
