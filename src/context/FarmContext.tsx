import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CropScan,
  FieldPlot,
  AgroAlert,
  WeatherData,
  MarketCommodity,
  DiseaseKnowledgeItem,
  DiagnosisResult,
} from '../types';
import {
  INITIAL_SCANS,
  INITIAL_FIELDS,
  INITIAL_ALERTS,
  INITIAL_WEATHER,
  INITIAL_MARKET,
  INITIAL_DISEASE_CATALOG,
} from '../data/mockData';

interface FarmContextType {
  scans: CropScan[];
  fields: FieldPlot[];
  alerts: AgroAlert[];
  weather: WeatherData;
  marketData: MarketCommodity[];
  diseaseCatalog: DiseaseKnowledgeItem[];
  unreadAlertCount: number;
  addScan: (newScan: Omit<CropScan, 'id' | 'timestamp'>) => CropScan;
  updateScanStatus: (id: string, status: 'active' | 'resolved' | 'monitoring') => void;
  deleteScan: (id: string) => void;
  addField: (field: Omit<FieldPlot, 'id' | 'healthScore' | 'ndviScore' | 'soilNPK'>) => void;
  updateField: (id: string, updated: Partial<FieldPlot>) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  addDiseaseCatalogItem: (item: Omit<DiseaseKnowledgeItem, 'id'>) => void;
  updateDiseaseCatalogItem: (id: string, item: Partial<DiseaseKnowledgeItem>) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scans, setScans] = useState<CropScan[]>(() => {
    const saved = localStorage.getItem('agrivision_scans');
    return saved ? JSON.parse(saved) : INITIAL_SCANS;
  });

  const [fields, setFields] = useState<FieldPlot[]>(() => {
    const saved = localStorage.getItem('agrivision_fields');
    return saved ? JSON.parse(saved) : INITIAL_FIELDS;
  });

  const [alerts, setAlerts] = useState<AgroAlert[]>(() => {
    const saved = localStorage.getItem('agrivision_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [weather] = useState<WeatherData>(INITIAL_WEATHER);
  const [marketData] = useState<MarketCommodity[]>(INITIAL_MARKET);
  const [diseaseCatalog, setDiseaseCatalog] = useState<DiseaseKnowledgeItem[]>(() => {
    const saved = localStorage.getItem('agrivision_diseases');
    return saved ? JSON.parse(saved) : INITIAL_DISEASE_CATALOG;
  });

  useEffect(() => {
    localStorage.setItem('agrivision_scans', JSON.stringify(scans));
  }, [scans]);

  useEffect(() => {
    localStorage.setItem('agrivision_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('agrivision_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('agrivision_diseases', JSON.stringify(diseaseCatalog));
  }, [diseaseCatalog]);

  const unreadAlertCount = alerts.filter((a) => !a.isRead).length;

  const addScan = (newScanData: Omit<CropScan, 'id' | 'timestamp'>): CropScan => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const scan: CropScan = {
      ...newScanData,
      id: `scan-${Date.now()}`,
      timestamp: formattedDate,
    };

    setScans((prev) => [scan, ...prev]);

    // If diagnosis is severe, automatically create an alert
    if (scan.diagnosis.severityLevel === 'High' || scan.diagnosis.severityLevel === 'Critical') {
      const newAlert: AgroAlert = {
        id: `alt-${Date.now()}`,
        type: 'disease',
        title: `Urgent: ${scan.diagnosis.diseaseName} Detected`,
        description: `New scan in ${scan.fieldName} identified high severity symptoms affecting approx. ${scan.diagnosis.affectedAreaPercentage}% of canopy.`,
        severity: scan.diagnosis.severityLevel === 'Critical' ? 'critical' : 'high',
        timestamp: 'Just now',
        fieldName: scan.fieldName,
        actionRequired: scan.diagnosis.chemicalTreatment[0] || scan.diagnosis.organicTreatment[0] || 'Inspect field immediately',
        isRead: false,
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }

    return scan;
  };

  const updateScanStatus = (id: string, status: 'active' | 'resolved' | 'monitoring') => {
    setScans((prev) =>
      prev.map((scan) => (scan.id === id ? { ...scan, status } : scan))
    );
  };

  const deleteScan = (id: string) => {
    setScans((prev) => prev.filter((scan) => scan.id !== id));
  };

  const addField = (fieldData: Omit<FieldPlot, 'id' | 'healthScore' | 'ndviScore' | 'soilNPK'>) => {
    const newField: FieldPlot = {
      ...fieldData,
      id: `fld-${Date.now()}`,
      healthScore: 88,
      ndviScore: 0.78,
      soilNPK: {
        nitrogen: 150,
        phosphorus: 45,
        potassium: 210,
        ph: 6.5,
      },
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (id: string, updated: Partial<FieldPlot>) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updated } : field))
    );
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert))
    );
  };

  const markAllAlertsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
  };

  const addDiseaseCatalogItem = (itemData: Omit<DiseaseKnowledgeItem, 'id'>) => {
    const newItem: DiseaseKnowledgeItem = {
      ...itemData,
      id: `dis-${Date.now()}`,
    };
    setDiseaseCatalog((prev) => [newItem, ...prev]);
  };

  const updateDiseaseCatalogItem = (id: string, itemData: Partial<DiseaseKnowledgeItem>) => {
    setDiseaseCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...itemData } : item))
    );
  };

  return (
    <FarmContext.Provider
      value={{
        scans,
        fields,
        alerts,
        weather,
        marketData,
        diseaseCatalog,
        unreadAlertCount,
        addScan,
        updateScanStatus,
        deleteScan,
        addField,
        updateField,
        markAlertRead,
        markAllAlertsRead,
        addDiseaseCatalogItem,
        updateDiseaseCatalogItem,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
