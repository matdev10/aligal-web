import { useEffect, useState } from "react";

import {
  getRegionsByCountry,
  getProvincesByRegion,
  getCommunesByProvince,
} from "../../services/geoApiService";

import "./ShippingForm.css";

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

        const data = await getRegionsByCountry(
          shipping.countryIso || "CL"
        );

        setRegions(data);
      } catch (error) {
        console.error(
          "Error cargando regiones:",
          error
        );

        setError(
          "No se pudieron cargar las regiones."
        );
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

        const data =
          await getProvincesByRegion(
            shipping.regionId
          );

        setProvinces(data);
      } catch (error) {
        console.error(
          "Error cargando provincias:",
          error
        );

        setError(
          "No se pudieron cargar las provincias."
        );
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

        const data =
          await getCommunesByProvince(
            shipping.provinceId
          );

        setCommunes(data);
      } catch (error) {
        console.error(
          "Error cargando comunas:",
          error
        );

        setError(
          "No se pudieron cargar las comunas."
        );
      } finally {
        setLoadingCommunes(false);
      }
    };

    loadCommunes();
  }, [shipping.provinceId]);

  return (
    <section className="shipping-form">

      <div className="shipping-form__header">
        <span>Despacho</span>

        <h2>
          Dirección de entrega
        </h2>

        <p>
          Ingresa la dirección donde quieres
          recibir tu pedido.
        </p>
      </div>

      {error && (
        <div className="shipping-form__error">
          {error}
        </div>
      )}

      <div className="shipping-form__fields">

        <div className="shipping-form__field">
          <label htmlFor="shipping-address">
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
          />
        </div>

        <div className="shipping-form__field">
          <label htmlFor="shipping-region">
            Región
          </label>

          <select
            id="shipping-region"
            name="regionId"
            value={shipping.regionId}
            onChange={onChange}
            disabled={loadingRegions}
          >
            <option value="">
              {loadingRegions
                ? "Cargando regiones..."
                : "Selecciona una región"}
            </option>

            {regions.map((region) => (
              <option
                key={region.id}
                value={region.id}
              >
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div className="shipping-form__field">
          <label htmlFor="shipping-province">
            Provincia
          </label>

          <select
            id="shipping-province"
            name="provinceId"
            value={shipping.provinceId}
            onChange={onChange}
            disabled={
              !shipping.regionId ||
              loadingProvinces
            }
          >
            <option value="">
              {loadingProvinces
                ? "Cargando provincias..."
                : "Selecciona una provincia"}
            </option>

            {provinces.map((province) => (
              <option
                key={province.id}
                value={province.id}
              >
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="shipping-form__field">
          <label htmlFor="shipping-commune">
            Comuna
          </label>

          <select
            id="shipping-commune"
            name="communeId"
            value={shipping.communeId}
            onChange={onChange}
            disabled={
              !shipping.provinceId ||
              loadingCommunes
            }
          >
            <option value="">
              {loadingCommunes
                ? "Cargando comunas..."
                : "Selecciona una comuna"}
            </option>

            {communes.map((commune) => (
              <option
                key={commune.id}
                value={commune.id}
              >
                {commune.name}
              </option>
            ))}
          </select>
        </div>

        <div className="shipping-form__field">
          <label htmlFor="shipping-notes">
            Notas adicionales
          </label>

          <textarea
            id="shipping-notes"
            name="notes"
            placeholder="Ej: dejar en conserjería, referencias de entrega..."
            value={shipping.notes}
            onChange={onChange}
          />
        </div>

      </div>
    </section>
  );
}

export default ShippingForm;