import "../style/privacy-policy.css";

function PrivacyPolicy() {
  return (
    <main className="privacy-policy">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="privacy-policy__hero">
        <div className="privacy-policy__container">
          <span className="privacy-policy__eyebrow">Información legal</span>

          <h1>Política de Privacidad</h1>

          <p className="privacy-policy__hero-description">
            Conoce cómo recopilamos, utilizamos y protegemos la información
            personal asociada al uso de Cerebria® y a las compras realizadas a
            través de nuestro sitio web.
          </p>

          <span className="privacy-policy__updated">
            Última actualización: 12 de agosto de 2026
          </span>
        </div>
      </section>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}
      <section className="privacy-policy__content">
        <div className="privacy-policy__container">
          <div className="privacy-policy__document">
            {/* INTRODUCCIÓN */}
            <section className="privacy-policy__section">
              <p>
                En Cerebria® y ALIGAL respetamos la privacidad de nuestros
                clientes y visitantes. Esta Política de Privacidad explica cómo
                recopilamos, utilizamos, almacenamos y protegemos los datos
                personales entregados al navegar por nuestro sitio web, realizar
                una compra o comunicarse con nosotros.
              </p>

              <p>
                El tratamiento de datos personales se realiza de acuerdo con la
                legislación chilena vigente en materia de privacidad y
                protección de datos personales.
              </p>
            </section>

            {/* 1 */}
            <section className="privacy-policy__section">
              <h2>1. Responsable del tratamiento</h2>

              <p>
                El sitio web de Cerebria® es administrado por ALIGAL E.I.R.L.,
                quien actúa como responsable del tratamiento de los datos
                personales recopilados directamente a través de este sitio.
              </p>

              <ul>
                <li>
                  <strong>Razón social:</strong> TOMAS BERNARDO GALVAN GONZALEZ
                  ALIMENTOS E.I.R.L.
                </li>

                <li>
                  <strong>Nombre de fantasía:</strong> ALIGAL E.I.R.L.
                </li>

                <li>
                  <strong>RUT:</strong> 77.645.561-K
                </li>

                <li>
                  <strong>Domicilio:</strong> Santiago, Región Metropolitana,
                  Chile
                </li>

                <li>
                  <strong>Correo electrónico:</strong>{" "}
                  <a href="mailto:contacto@aligal.cl">contacto@aligal.cl</a>
                </li>
              </ul>
            </section>

            {/* 2 */}
            <section className="privacy-policy__section">
              <h2>2. Datos personales que podemos recopilar</h2>

              <p>
                Dependiendo de la forma en que utilices nuestro sitio, podemos
                recopilar los siguientes datos:
              </p>

              <ul>
                <li>Nombre y apellidos.</li>

                <li>Dirección de correo electrónico.</li>

                <li>Número de teléfono.</li>

                <li>
                  Información necesaria para el despacho, como región,
                  provincia, comuna, dirección y referencias de entrega.
                </li>

                <li>
                  Información relacionada con los productos adquiridos,
                  cantidades y valor de la compra.
                </li>

                <li>
                  Información asociada a la orden, estado del pedido y estado
                  del pago.
                </li>

                <li>
                  Información proporcionada voluntariamente al comunicarse con
                  nosotros.
                </li>

                <li>
                  Determinados datos técnicos necesarios para el funcionamiento
                  y seguridad del sitio.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section className="privacy-policy__section">
              <h2>3. Finalidad del tratamiento de los datos</h2>

              <p>
                Utilizamos los datos personales únicamente para finalidades
                relacionadas con el funcionamiento de nuestro servicio y la
                gestión de las compras realizadas a través del sitio.
              </p>

              <p>Entre estas finalidades se encuentran:</p>

              <ul>
                <li>Procesar y registrar órdenes de compra.</li>

                <li>Identificar al comprador.</li>

                <li>Gestionar el despacho o entrega de los productos.</li>

                <li>
                  Enviar confirmaciones e información relacionada con una
                  compra.
                </li>

                <li>
                  Gestionar consultas, solicitudes o comunicaciones de los
                  clientes.
                </li>

                <li>
                  Mantener registros administrativos y comerciales de las
                  operaciones realizadas.
                </li>

                <li>
                  Prevenir usos indebidos, fraudes o incidentes de seguridad.
                </li>

                <li>Cumplir obligaciones legales aplicables.</li>

                <li>
                  Mantener y mejorar el funcionamiento técnico del sitio web.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section className="privacy-policy__section">
              <h2>4. Procesamiento de pagos mediante Mercado Pago</h2>

              <p>
                Las transacciones realizadas a través del sitio utilizan Mercado
                Pago como proveedor externo para el procesamiento de pagos.
              </p>

              <p>
                Cerebria® y ALIGAL no solicitan ni almacenan directamente los
                datos completos de tarjetas de crédito o débito utilizados
                durante el proceso de pago.
              </p>

              <p>
                La información necesaria para autorizar una transacción es
                gestionada por Mercado Pago dentro de su propia infraestructura,
                de acuerdo con sus términos, medidas de seguridad y políticas de
                privacidad.
              </p>

              <p>
                Nuestro sistema puede conservar información relacionada con el
                resultado de la operación, como identificadores de la
                transacción, referencia de la orden y estado del pago, cuando
                sea necesario para gestionar correctamente la compra.
              </p>

              <p>
                Puedes consultar la información de privacidad de Mercado Pago
                directamente en su sitio:
              </p>

              <a
                className="privacy-policy__external-link"
                href="https://www.mercadopago.cl/privacidad"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de privacidad de Mercado Pago
              </a>
            </section>

            {/* 5 */}
            <section className="privacy-policy__section">
              <h2>5. Información relacionada con el despacho</h2>

              <p>
                Cuando realizas una compra, necesitamos tratar determinados
                datos personales para gestionar correctamente la entrega de los
                productos.
              </p>

              <p>Estos datos pueden incluir:</p>

              <ul>
                <li>Nombre del destinatario.</li>
                <li>Teléfono de contacto.</li>
                <li>Región.</li>
                <li>Provincia.</li>
                <li>Comuna.</li>
                <li>Dirección de entrega.</li>
                <li>Información adicional o referencias de despacho.</li>
              </ul>

              <p>
                Cuando sea necesario para efectuar una entrega, los datos
                estrictamente necesarios podrán ser comunicados al proveedor
                encargado del transporte o despacho.
              </p>
            </section>

            {/* 6 */}
            <section className="privacy-policy__section">
              <h2>6. Proveedores tecnológicos</h2>

              <p>
                Para operar nuestro sitio y prestar nuestros servicios podemos
                utilizar proveedores tecnológicos externos.
              </p>

              <p>
                Estos proveedores pueden participar en funciones tales como:
              </p>

              <ul>
                <li>Alojamiento del sitio web.</li>
                <li>Infraestructura de servidores.</li>
                <li>Almacenamiento de bases de datos.</li>
                <li>Procesamiento de pagos.</li>
                <li>Envío de correos electrónicos transaccionales.</li>
                <li>Seguridad y mantenimiento tecnológico.</li>
              </ul>

              <p>
                El acceso de estos proveedores a información personal se limita
                a aquella necesaria para prestar los servicios correspondientes.
              </p>
            </section>


            {/* 7 */}
            <section className="privacy-policy__section">
              <h2>7. Cookies y almacenamiento local</h2>

              <p>
                Actualmente, nuestro sitio no utiliza cookies propias con fines
                publicitarios, de perfilamiento o de analítica de
                comportamiento.
              </p>

              <p>
                Cerebria® utiliza almacenamiento local del navegador
                (localStorage) para conservar temporalmente la información
                relacionada con los productos agregados al carrito de compra.
              </p>

              <p>
                Esta tecnología permite mantener el contenido del carrito
                disponible mientras navegas por el sitio y cuando vuelves a
                visitarlo desde el mismo navegador y dispositivo.
              </p>

              <p>
                La información almacenada localmente para esta finalidad no
                contiene datos de tarjetas de crédito o débito ni información
                utilizada directamente para procesar pagos.
              </p>

              <p>
                Puedes eliminar esta información utilizando las opciones de
                almacenamiento, privacidad o datos del sitio disponibles en tu
                navegador.
              </p>

              <p>
                Algunos servicios externos utilizados durante el proceso de
                compra, como Mercado Pago, pueden utilizar sus propias cookies o
                tecnologías similares de acuerdo con sus respectivas políticas
                de privacidad.
              </p>
            </section>

            {/* 8 */}
            <section className="privacy-policy__section">
              <h2>8. Comunicación de datos a terceros</h2>

              <p>
                Cerebria® y ALIGAL no venden ni comercializan los datos
                personales de sus clientes.
              </p>

              <p>
                La información solamente podrá ser comunicada a terceros cuando
                sea necesario para:
              </p>

              <ul>
                <li>Procesar un pago.</li>
                <li>Gestionar un despacho.</li>
                <li>Enviar comunicaciones relacionadas con una compra.</li>
                <li>Mantener la infraestructura tecnológica del servicio.</li>
                <li>Cumplir una obligación legal.</li>
                <li>
                  Atender un requerimiento válido de una autoridad competente.
                </li>
              </ul>
            </section>

            {/* 9 */}
            <section className="privacy-policy__section">
              <h2>9. Conservación de la información</h2>

              <p>
                Conservaremos los datos personales durante el tiempo necesario
                para gestionar las finalidades para las cuales fueron
                recopilados y durante aquellos períodos adicionales que sean
                necesarios para cumplir obligaciones legales, tributarias,
                contables, contractuales o relacionadas con la resolución de
                posibles controversias.
              </p>

              <p>
                Cuando los datos dejen de ser necesarios y no exista una
                obligación que justifique su conservación, podrán ser
                eliminados, bloqueados o anonimizados según corresponda.
              </p>
            </section>

            {/* 10 */}
            <section className="privacy-policy__section">
              <h2>10. Seguridad de la información</h2>

              <p>
                Adoptamos medidas técnicas y organizativas razonables destinadas
                a proteger los datos personales contra accesos no autorizados,
                pérdida, alteración, divulgación o destrucción.
              </p>

              <p>
                Sin embargo, ningún sistema informático o transmisión de datos a
                través de Internet puede garantizar una seguridad absoluta.
              </p>
            </section>

            {/* 11 */}
            <section className="privacy-policy__section">
              <h2>11. Derechos de los titulares</h2>

              <p>
                Los titulares de datos personales podrán ejercer los derechos
                que les reconozca la legislación chilena vigente en cada
                momento.
              </p>

              <p>Según corresponda, estos pueden incluir el derecho a:</p>

              <ul>
                <li>Solicitar acceso a sus datos personales.</li>

                <li>
                  Solicitar la rectificación de datos incorrectos, inexactos o
                  desactualizados.
                </li>

                <li>
                  Solicitar la eliminación o supresión de datos cuando
                  corresponda.
                </li>

                <li>
                  Solicitar el bloqueo u oponerse a determinados tratamientos
                  cuando legalmente proceda.
                </li>

                <li>
                  Ejercer otros derechos establecidos por la normativa de
                  protección de datos aplicable.
                </li>
              </ul>

              <p>
                Para realizar una solicitud relacionada con tus datos
                personales, puedes escribir a:
              </p>

              <a
                className="privacy-policy__contact-link"
                href="mailto:contacto@aligal.cl"
              >
                contacto@aligal.cl
              </a>
            </section>

            {/* 12 */}
            <section className="privacy-policy__section">
              <h2>12. Exactitud de la información</h2>

              <p>
                El usuario es responsable de proporcionar información correcta,
                actualizada y suficiente para permitir el procesamiento de una
                compra y la correcta entrega de los productos.
              </p>

              <p>
                Si detectas un error en los datos asociados a una orden,
                recomendamos comunicarte con nosotros lo antes posible.
              </p>
            </section>

            {/* 13 */}
            <section className="privacy-policy__section">
              <h2>13. Enlaces y servicios externos</h2>

              <p>
                Nuestro sitio puede contener enlaces a servicios o plataformas
                administradas por terceros.
              </p>

              <p>
                Una vez que accedes a un servicio externo, el tratamiento de tus
                datos personales estará sujeto a las políticas y condiciones del
                proveedor correspondiente.
              </p>
            </section>

            {/* 14 */}
            <section className="privacy-policy__section">
              <h2>14. Modificaciones a esta política</h2>

              <p>
                Podemos actualizar esta Política de Privacidad cuando existan
                cambios en nuestros servicios, procesos internos, proveedores
                tecnológicos o en la legislación aplicable.
              </p>

              <p>
                La versión vigente estará disponible permanentemente en esta
                página e indicará la fecha de su última actualización.
              </p>
            </section>

            {/* 15 */}
            <section className="privacy-policy__section">
              <h2>15. Contacto</h2>

              <p>
                Para consultas relacionadas con esta Política de Privacidad,
                tratamiento de datos personales o ejercicio de derechos, puedes
                comunicarte con:
              </p>

              <div className="privacy-policy__contact">
                <strong>ALIGAL — Cerebria®</strong>

                <a href="mailto:contacto@aligal.cl">contacto@aligal.cl</a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;