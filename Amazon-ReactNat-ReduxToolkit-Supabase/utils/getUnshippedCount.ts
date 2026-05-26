import { supabase } from "@/supabase";
export const getUnshippedCount = async (
  sellerId: string | undefined
): Promise<number | null> => {
  let query = supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", sellerId)
    .eq("is_shipped", false);

  const { count, error } = await query;
  if (error) {
    console.log("Failed to fetch order count:", error);
    return null;
  }
  return count ?? 0;
};
