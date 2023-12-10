import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
export * from "./auth.store";
export * from "./user.store";
export * from "./apply.store";
export * from "./app.store";
export * from "./chat.store";
export * from "./moment.store";

export const pinia = createPinia();

pinia.use(
	createPersistedState({
		storage: {
			getItem(key) {
				key = "pinia_store_" + key;
				return uni.getStorageSync(key);
			},
			setItem(key, value) {
				key = "pinia_store_" + key;
				uni.setStorageSync(key, value);
			},
		},
	}),
);
// ;(window as any).pinia = pinia
