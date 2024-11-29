// AdminSettings.jsx

import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import './AdminSettings.css';

function AdminSettings({
  selectedDepartment,
  setSelectedDepartment,
  adminSettings,
  handleAdminToggle,
  sectionsList,
  departmentsList
}) {
  return (
    <div className="admin-area">
      <h3>Configurações Administrativas</h3>
      {/* Interface para selecionar departamento */}
      <div className="department-selector">
        <Label htmlFor="department-select">Selecione o Departamento:</Label>
        <select
          id="department-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departmentsList.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Configuração das seções para o departamento selecionado */}
      <div className="section-config">
        <h4>Configurar Visibilidade das Seções para "{selectedDepartment}"</h4>
        <div className="switch-group checkbox-group">
          {sectionsList.map(section => (
            <div key={section.id} className="flex items-center space-x-2">
              <Switch
                id={`switch-admin-${section.id}`}
                checked={!!adminSettings[section.id]}
                onCheckedChange={(checked) => handleAdminToggle(section.id, checked)}
              />
              <Label htmlFor={`switch-admin-${section.id}`}>{section.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;