import { useEffect, useState } from "react";

import {
  getRegionsByCountry,
  getProvincesByRegion,
  getCommunesByProvince,
} from "../../services/geoApiService";

import { MapPin } from "lucide-react";

import { glassCard, inputClass, labelClass } from "../ui/glass";
import SectionHeader from "./SectionHeader";

// NOTA: Ya no importamos "./ShippingForm.css"; todo es Tailwind.

function ShippingForm({ shipping, onChange }) {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegions = async () => {
      try {
        setLoadingRegions(true);
        setError("");

        const data = await getRegionsByCountry(shipping.countryIso || "CL");

        setRegions(data);
      } catch (error) {
        console.error("Error cargando regiones:", error);

        setError("No se pudieron cargar las regiones.");
      } finally {
        setLoadingRegions(false);
      }
    };

    loadRegions();
  }, [shipping.countryIso]);

  useEffect(() => {
    const loadProvinces = async () => {
      if (!shipping.regionId) {
        setProvinces([]);
        return;
      }

      try {
        setLoadingProvinces(true);
        setError("");

        const data = await getProvincesByRegion(shipping.regionId);

        setProvinces(data);
      } catch (error) {
        console.error("Error cargando provincias:", error);

        setError("No se pudieron cargar las provincias.");
      } finally {
        setLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, [shipping.regionId]);

  useEffect(() => {
    const loadCommunes = async () => {
      if (!shipping.provinceId) {
        setCommunes([]);
        return;
      }

      try {
        setLoadingCommunes(true);
        setError("");

        const data = await getCommunesByProvince(shipping.provinceId);

        setCommunes(data);
      } catch (error) {
        console.error("Error cargando comunas:", error);

        setError("No se pudieron cargar las comunas.");
      } finally {
        setLoadingCommunes(false);
      }
    };

    loadCommunes();
  }, [shipping.provinceId]);

  return (
    <section className={glassCard}>
      <SectionHeader
        step={2}
        label="Despacho"
        title="Dirección de entrega"
        text="Ingresa la dirección donde quieres recibir tu pedido."
        Icon={MapPin}
      />

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      {/* - Móvil: un campo por fila
          - sm: región / provincia / comuna en columnas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="shipping-address" className={labelClass}>
            Dirección
          </label>
          <input
            id="shipping-address"
            type="text"
            name="address"
            placeholder="Calle, número, departamento..."
            value={shipping.address}
            onChange={onChange}
            autoComplete="street-address"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipping-region" className={labelClass}>
            Región
          </label>
          <select
            id="shipping-region"
            name="regionId"
            value={shipping.regionId}
            onChange={onChange}
            disabled={loadingRegions}
            className={inputClass}
          >
            <option value="">
              {loadingRegions ? "Cargando regiones..." : "Selecciona una región"}
            </option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shipping-province" className={labelClass}>
            Provincia
          </label>
          <select
            id="shipping-province"
            name="provinceId"
            value={shipping.provinceId}
            onChange={onChange}
            disabled={!shipping.regionId || loadingProvinces}
            className={inputClass}
          >
            <option value="">
              {loadingProvinces ? "Cargando provincias..." : "Selecciona una provincia"}
            </option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shipping-commune" className={labelClass}>
            Comuna
          </label>
          <select
            id="shipping-commune"
            name="communeId"
            value={shipping.communeId}
            onChange={onChange}
            disabled={!shipping.provinceId || loadingCommunes}
            className={inputClass}
          >
            <option value="">
              {loadingCommunes ? "Cargando comunas..." : "Selecciona una comuna"}
            </option>
            {communes.map((commune) => (
              <option key={commune.id} value={commune.id}>
                {commune.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="shipping-notes" className={labelClass}>
            Notas adicionales <span className="text-ink/35">(opcional)</span>
          </label>
          <textarea
            id="shipping-notes"
            name="notes"
            rows="3"
            placeholder="Ej: dejar en conserjería, referencias de entrega..."
            value={shipping.notes}
            onChange={onChange}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingForm;
