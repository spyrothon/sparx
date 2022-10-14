import create from "zustand";

export interface LayerSpec {
  name: string;
  render: () => React.ReactNode;
}

export interface LayersStoreState {
  layers: LayerSpec[];
}

export const useLayersStore = create<LayersStoreState>(() => ({
  layers: [],
}));

export function createLayer(spec: LayerSpec) {
  useLayersStore.setState((state) => ({ layers: [...state.layers, spec] }));
}

export function removeLayer(name: string) {
  useLayersStore.setState((state) => {
    const index = state.layers.findIndex((layer) => layer.name === name);
    if (index < 0) return state;

    const newLayers = [...state.layers];
    newLayers.splice(index, 1);
    return { layers: newLayers };
  });
}

export function popLayer() {
  useLayersStore.setState((state) => {
    const newLayers = [...state.layers];
    newLayers.pop();
    return { layers: newLayers };
  });
}

/**
 * Subscribe to the LayersStore, returning the LayerSpec for the given layer.
 * This is good for listening to when a Layer gets removed from the store to
 * perform some other action (like toggling an open/close button).
 *
 * If this hook returns a value, the layer is visible. Otherwise, if the layer
 * is not visible, it returns undefined.
 */
export function useLayerSubscription(name: string) {
  return useLayersStore((state) => state.layers.find((layer) => layer.name === name));
}
