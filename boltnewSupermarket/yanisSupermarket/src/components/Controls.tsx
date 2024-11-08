import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

export function Controls() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center">
      <div className="bg-white/90 p-4 rounded-lg shadow-lg text-center mb-2">
        <p className="text-sm text-gray-600 mb-2">Utilisez les flèches pour vous déplacer</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-start-2">
            <button
              data-key="ArrowUp"
              aria-label="Avancer"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onPointerDown={(e) => e.currentTarget.setAttribute('aria-pressed', 'true')}
              onPointerUp={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
              onPointerLeave={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
          <div className="col-start-1">
            <button
              data-key="ArrowLeft"
              aria-label="Tourner à gauche"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onPointerDown={(e) => e.currentTarget.setAttribute('aria-pressed', 'true')}
              onPointerUp={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
              onPointerLeave={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="col-start-2">
            <button
              data-key="ArrowDown"
              aria-label="Reculer"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onPointerDown={(e) => e.currentTarget.setAttribute('aria-pressed', 'true')}
              onPointerUp={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
              onPointerLeave={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
          <div className="col-start-3">
            <button
              data-key="ArrowRight"
              aria-label="Tourner à droite"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onPointerDown={(e) => e.currentTarget.setAttribute('aria-pressed', 'true')}
              onPointerUp={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
              onPointerLeave={(e) => e.currentTarget.setAttribute('aria-pressed', 'false')}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}