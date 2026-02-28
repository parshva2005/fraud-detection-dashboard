import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { ToggleLeft, ToggleRight, Maximize2 } from 'lucide-react';
import { playClickSound } from '../../utils/sounds';

interface ChartProps {
    title: string;
    description: string;
    data2D: any[];
    layout2D: any;
    data3D: any[];
    layout3D: any;
}

export const InteractiveChart: React.FC<ChartProps> = ({ title, description, data2D, layout2D, data3D, layout3D }) => {
    const [is3D, setIs3D] = useState(false);

    const baseLayout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { family: 'inherit', color: 'inherit' },
        margin: { t: 40, r: 20, b: 40, l: 40 },
        autosize: true,
    };

    const currentData = is3D ? data3D : data2D;
    const currentLayout = {
        ...baseLayout,
        ...(is3D ? layout3D : layout2D)
    };

    return (
        <div className="glass rounded-3xl p-6 flex flex-col h-[500px]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                </div>

                {/* Toggle Switch */}
                <button
                    onClick={() => { playClickSound(); setIs3D(!is3D); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-border"
                >
                    <span className={`text-xs font-semibold ${!is3D ? 'text-primary' : 'text-gray-500'}`}>2D</span>
                    {is3D ? (
                        <ToggleRight className="w-5 h-5 text-primary" />
                    ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`text-xs font-semibold ${is3D ? 'text-primary' : 'text-gray-500'}`}>3D</span>
                </button>
            </div>

            <div className="flex-1 w-full relative">
                <Plot
                    data={currentData}
                    layout={currentLayout}
                    config={{ displayModeBar: false, responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
                <div className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur rounded-md border border-border text-gray-400 hover:text-primary transition-colors cursor-pointer hidden">
                    <Maximize2 className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};
