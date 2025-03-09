import { useState } from "react";

const coverturasJSON = {
    "aseguradoras": [
        {
            "nombre": "Mercantil Andina",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 8 },
                { "tipo": "Tercero Completo", "max_antiguedad": 20 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 30 }
            ]
        },
        {
            "nombre": "Rivadavia",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 10 },
                { "tipo": "Tercero Completo", "max_antiguedad": 20 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 30 }
            ]
        },
        {
            "nombre": "Mapfre",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 8 },
                { "tipo": "Tercero Completo", "max_antiguedad": 15 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 20 }
            ]
        }
    ]
}

interface StepCoveragesProps {
    yearVehicle: number;
    formData: any;
    setFormData: Function;
    error: string;
}

const StepCoverages: React.FC<StepCoveragesProps> = ({ yearVehicle, formData, setFormData, error }) => {
    const [isSelected, setIsSelected] = useState('');
    const yearNow = new Date().getFullYear();
    const antique = yearNow - yearVehicle;

    const getCoverages = () => {
        return coverturasJSON.aseguradoras.map(aseguradora => ({
            nombre: aseguradora.nombre,
            coberturas: aseguradora.coberturas
                .filter(cobertura => antique <= cobertura.max_antiguedad)
                .map(cobertura => cobertura.tipo)
        })).filter(aseguradora => aseguradora.coberturas.length > 0);
    }

    return (
        <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
                Coberturas disponibles
            </label>
            <div className="w-full overflow-x-auto pb-4">
                <div className="flex space-x-4">
                    {getCoverages().map((aseguradora, index) => (
                        aseguradora.coberturas.map((cobertura, idx) => (
                            <div
                                key={`${index}-${idx}`}
                                className={`min-w-[200px] p-4 cursor-pointer border rounded-md shadow-md  transition-colors
                                        ${isSelected === `${index}-${idx}` ? 'bg-[#152549] text-gray-600 border-gray-600' : 'bg-white border-[#152549]'}`}
                                onClick={() => {
                                    setFormData({ ...formData, tipoSeguro: `${aseguradora.nombre} - ${cobertura}` })
                                    setIsSelected(`${index}-${idx}`)
                                }}
                            >
                                <p className={`text-sm font-medium ${isSelected === `${index}-${idx}` ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {aseguradora.nombre} - {cobertura}
                                </p>
                            </div>
                        ))
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Checkbox para suscribirse al newsletter */}
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="checkbox"
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter || false}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            subscribeNewsletter: e.target.checked,
                        })
                    }
                    className="w-12 h-12 md:w-4 md:h-4 text-[#3ec1d3] border-gray-300 rounded focus:ring-[#3ec1d3]"
                />
                <label
                    htmlFor="subscribeNewsletter"
                    className="text-sm text-gray-600"
                >
                    Suscríbete a nuestro newsletter para recibir
                    las últimas novedades y ofertas especiales.
                </label>
            </div>
        </div>
    )
}

export default StepCoverages;

