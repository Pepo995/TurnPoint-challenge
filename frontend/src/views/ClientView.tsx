import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getClients, createClient, deleteClient } from "../api/clientsApi";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

enum FundingSource {
  ndis = "NDIS",
  hcp = "HCP",
  chsp = "CHSP",
  dva = "DVA",
  hacc = "HACC"
}

const createValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  dob: z.string().refine((date) => new Date(date) < new Date(), {
    message: "Date of Birth must be in the past"
  }),
  mainLanguage: z.string().nonempty("Main Language is required"),
  secondaryLanguage: z.string().optional(),
  fundingSource: z.nativeEnum(FundingSource)
});

export type CreateValidationInterface = z.infer<typeof createValidationSchema>;

interface Client {
  id: number;
  name: string;
  dob: string;
  mainLanguage: string;
  secondaryLanguage?: string;
  fundingSource: string;
}

const ClientView: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: clientsData,
    error
  } = useQuery<Client[]>("clients", getClients);

  const mutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      toast.success("Client created successfully");
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the client");
      }
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateValidationInterface>({
    resolver: zodResolver(createValidationSchema)
  });

  const onSubmit: SubmitHandler<CreateValidationInterface> = (data) => {
    mutation.mutate(data);
    reset();
  };

  const handleDelete = (id: number) => {
    deleteClient(id)
      .then(() => {
        queryClient.invalidateQueries("clients");
        toast.success("Client deleted successfully");
      })
      .catch(() => {
        toast.error("An error occurred while deleting the client");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading clients</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Management</h1>
      <div className="flex justify-between gap-6 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-3/5 mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold w-40 text-left"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold w-40 text-left"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              placeholder="Date of Birth"
              {...register("dob")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.dob ? "border-red-500" : ""
              }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs italic">
                {errors.dob.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold w-40 text-left"
              htmlFor="mainLanguage"
            >
              Main Language
            </label>
            <input
              type="text"
              id="mainLanguage"
              placeholder="Main Language"
              {...register("mainLanguage")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.mainLanguage ? "border-red-500" : ""
              }`}
            />
            {errors.mainLanguage && (
              <p className="text-red-500 text-xs italic">
                {errors.mainLanguage.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold w-40 text-left"
              htmlFor="secondaryLanguage"
            >
              Secondary Language
            </label>
            <input
              type="text"
              id="secondaryLanguage"
              placeholder="Secondary Language"
              {...register("secondaryLanguage")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold w-40 text-left"
              htmlFor="fundingSource"
            >
              Funding Source
            </label>
            <select
              id="fundingSource"
              {...register("fundingSource")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.fundingSource ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Funding Source</option>
              <option value="NDIS">NDIS</option>
              <option value="HCP">HCP</option>
              <option value="CHSP">CHSP</option>
              <option value="DVA">DVA</option>
              <option value="HACC">HACC</option>
            </select>
            {errors.fundingSource && (
              <p className="text-red-500 text-xs italic">
                {errors.fundingSource.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Client
            </button>
          </div>
        </form>

        <ul className="w-2/5 bg-white shadow-md rounded px-8 pt-6 pb-8 list-disc pl-5 h-96 overflow-y-auto">
          {clientsData?.map((client) => (
            <li
              key={client.id}
              className="mb-2 flex justify-between items-center"
            >
              <div>
                <strong>{client.name}</strong> -{" "}
                {new Date(client.dob).toLocaleDateString()} -{" "}
                {client.mainLanguage} - {client.fundingSource}
              </div>
              <button
                onClick={() => handleDelete(client.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientView;
