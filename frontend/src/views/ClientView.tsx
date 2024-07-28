import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getClients, createClient } from '../api/clientsApi';

enum FundingSource {
  ndis = "NDIS",
  hcp = "HCP",
  chsp = "CHSP",
  dva = "DVA",
  hacc = "HACC"
}

const createValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  dob: z.string().nonempty("Date of Birth is required"),
  mainLanguage: z.string().nonempty("Main Language is required"),
  secondaryLanguage: z.string().optional(),
  fundingSource: z.nativeEnum(FundingSource),
});
export type CreateValidationInterface = z.infer<typeof createValidationSchema>;

interface Client {
  id: number;
  name: string;
  dateOfBirth: string;
  mainLanguage: string;
  secondaryLanguage?: string;
  fundingSource: string;
}

const ClientView: React.FC = () => {
  const queryClient = useQueryClient();

  const { isLoading, data: clientsData, error } = useQuery<Client[]>(
    'clients',
    getClients
  );

  const mutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateValidationInterface>({
    resolver: zodResolver(createValidationSchema),
  });

  const onSubmit: SubmitHandler<CreateValidationInterface> = data => {
    mutation.mutate(data);
    reset();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading clients</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <input 
          type="text" 
          placeholder="Name" 
          {...register('name')} 
          className={`border p-2 m-2 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <input 
          type="date" 
          placeholder="Date of Birth" 
          {...register('dob')} 
          className={`border p-2 m-2 ${errors.dob ? 'border-red-500' : ''}`}
        />
        {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}

        <input 
          type="text" 
          placeholder="Main Language" 
          {...register('mainLanguage')} 
          className={`border p-2 m-2 ${errors.mainLanguage ? 'border-red-500' : ''}`}
        />
        {errors.mainLanguage && <span className="text-red-500">{errors.mainLanguage.message}</span>}

        <input 
          type="text" 
          placeholder="Secondary Language" 
          {...register('secondaryLanguage')} 
          className="border p-2 m-2"
        />

        <select 
          {...register('fundingSource')} 
          className={`border p-2 m-2 ${errors.fundingSource ? 'border-red-500' : ''}`}
        >
          <option value="">Select Funding Source</option>
          <option value="NDIS">NDIS</option>
          <option value="HCP">HCP</option>
          <option value="CHSP">CHSP</option>
          <option value="DVA">DVA</option>
          <option value="HACC">HACC</option>
        </select>
        {errors.fundingSource && <span className="text-red-500">{errors.fundingSource.message}</span>}

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 m-2"
        >
          Add Client
        </button>
      </form>
      <ul className="list-disc pl-5">
        {clientsData?.map(client => (
          <li key={client.id} className="mb-2">
            <strong>{client.name}</strong> - {client.dateOfBirth} - {client.mainLanguage} - {client.fundingSource}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientView;
