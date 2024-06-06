import { useMutation, useQueryClient, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): Promise<AxiosResponse<any>> => {
    const response = await axios.post(API_URL + '/food', data);
    return response;
}

export function useFoodDataMutate(): UseMutationResult<AxiosResponse<any>, unknown, FoodData, unknown> {
    const queryClient = useQueryClient();
    
    return useMutation<AxiosResponse<any>, unknown, FoodData>({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        },
    });
}