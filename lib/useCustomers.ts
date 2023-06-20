import useSwr, { KeyedMutator } from 'swr';
import { useEffect } from 'react';
import fetchJSON from './fetchJSON';
import type { CustomerApiResponse } from '@pages/api/customers';
import type { Customer } from '@models/customer';
import { UNESCAPED_VALUE } from 'mustache';

interface Props {
  user_id: number,
}

interface hookReturn {
  response: CustomerApiResponse | undefined,
  mutateCustomers: KeyedMutator<CustomerApiResponse>,
  isLoading: boolean,
}

export default function useCustomers(
  user_id: number
): hookReturn  {
  const { data, mutate, isLoading } = useSwr(`/api/customers?user_id=${user_id}`, fetchJSON<CustomerApiResponse>);

  return {
    response: data,
    mutateCustomers: mutate,
    isLoading,
  }
}