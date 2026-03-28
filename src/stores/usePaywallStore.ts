import { create } from "zustand";

export type SubscriptionTier = "free" | "essential" | "pro";

const TIER_RANK: Record<SubscriptionTier, number> = {
  free: 0,
  essential: 1,
  pro: 2,
};

export function tierMeetsRequirement(
  userTier: SubscriptionTier,
  required: SubscriptionTier,
): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[required];
}

interface PaywallState {
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
}

export const usePaywallStore = create<PaywallState>((set) => ({
  subscriptionTier: "free",
  setSubscriptionTier: (subscriptionTier) => set({ subscriptionTier }),
}));
