import fetchJSON from "@lib/fetchJSON";
import { NumberRange } from "@models/settings";
import { NumberRangeApiResponse } from "@pages/api/settings/numbers";
import useSwr, { KeyedMutator } from "swr";

interface numberRangeData {
  numberRanges?: NumberRange[],
  mutateNumbers: KeyedMutator<NumberRangeApiResponse>,
  isLoading: boolean,
}

export default function useNumberRanges(
    user_id: number
): numberRangeData {
  const { data, mutate, isLoading} = useSwr(
    `/api/settings/numbers?user_id=${ user_id }`,
    fetchJSON<NumberRangeApiResponse>
  );
  
  return {
    numberRanges: data?.numbers,
    mutateNumbers: mutate,
    isLoading
  }
}