import { useMutation, useQueryClient} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { readProductData, writeProductData } from '../api/firebase';

export default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery(['products'], readProductData, { staleTime: 1000 * 60 });

    const addProduct = useMutation(
        ({product, url}) => writeProductData({...product, url}),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    );

    return {productsQuery, addProduct};
}