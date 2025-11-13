// components/DriverForm.tsx
import React from 'react';
import { STATES } from '../constants';

interface DriverFormProps {
  driverName: string;
  setDriverName: (v: string) => void;
  loadNumber: string;
  setLoadNumber: (v: string) => void;
  bolNumber: string;
  setBolNumber: (v: string) => void;
  pickupCity: string;
  setPickupCity: (v: string) => void;
  pickupState: string;
  setPickupState: (v: string) => void;
  deliveryCity: string;
  setDeliveryCity: (v: string) => void;
  deliveryState: string;
  setDeliveryState: (v: string) => void;
}

export const DriverForm: React.FC<DriverFormProps> = ({
  driverName, setDriverName,
  loadNumber, setLoadNumber,
  bolNumber, setBolNumber,
  pickupCity, setPickupCity,
  pickupState, setPickupState,
  deliveryCity, setDeliveryCity,
  deliveryState, setDeliveryState,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Driver Name *</label>
        <input
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Load #</label>
        <input
          type="text"
          value={loadNumber}
          onChange={(e) => setLoadNumber(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
          placeholder="L12345"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">BOL #</label>
        <input
          type="text"
          value={bolNumber}
          onChange={(e) => setBolNumber(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
          placeholder="BOL98765"
        />
      </div>

      <div className="space-y-2 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">Pickup City / State</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
              placeholder="City"
            />
            <select
              value={pickupState}
              onChange={(e) => setPickupState(e.target.value)}
              className="w-24 px-2 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option value="">ST</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Delivery City / State</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
              placeholder="City"
            />
            <select
              value={deliveryState}
              onChange={(e) => setDeliveryState(e.target.value)}
              className="w-24 px-2 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option value="">ST</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};