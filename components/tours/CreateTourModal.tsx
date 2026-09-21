"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  NumberField,
  Select,
  Spinner,
  TextArea,
  TextField,
  useOverlayState,
} from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { createTour } from "@/lib/api/tours";
import { categoryQueries } from "@/lib/queries/category-queries";
import { cityQueries } from "@/lib/queries/city-queries";
import { tourKeys } from "@/lib/queries/tour-queries";
import {
  createTourSchema,
  type CreateTourInput,
} from "@/lib/schemas/tour.schema";

interface CreateTourModalProps {
  token: string;
}

export function CreateTourModal({ token }: CreateTourModalProps) {
  const queryClient = useQueryClient();
  const state = useOverlayState();

  // Fetch cities — cached after first load, instant on subsequent modal opens
  const { data: cities = [], isLoading: citiesLoading } = useQuery(
    cityQueries.list(token),
  );

  // Fetch categories — also cached after first load
  const { data: categories = [], isLoading: categoriesLoading } = useQuery(
    categoryQueries.list(token),
  );

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<CreateTourInput>({
    resolver: zodResolver(createTourSchema),
    defaultValues: {
      name: "",
      description: "",
      durationMinutes: 60,
      pricePerPerson: 0,
      maxCapacity: 10,
      categoryId: undefined as unknown as number,
      cityId: undefined as unknown as number,
    },
  });

  const onSubmit = async (data: CreateTourInput) => {
    try {
      await createTour(data, token);
      await queryClient.invalidateQueries({ queryKey: tourKeys.lists() });
      reset();
      state.close();
    } catch (err) {
      let message = "No se pudo crear el tour. Intenta de nuevo.";

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const body = err.response?.data as
          | { message?: string; error?: string }
          | undefined;
        const backendMsg = body?.message ?? body?.error;

        if (backendMsg) {
          message = backendMsg;
        } else if (status === 401) {
          message = "No tienes permiso para crear tours. Inicia sesión de nuevo.";
        } else if (status === 400) {
          message = "Los datos enviados son inválidos. Revisa el formulario.";
        } else if (status === 422) {
          message = "Error de validación en el servidor. Revisa los campos.";
        } else if (status === 500) {
          message = "Error interno del servidor. Intenta más tarde.";
        }
      }

      setError("root.serverError", { message });
    }
  };

  const handleClose = () => {
    reset();
    state.close();
  };

  return (
    <>
      <Button variant="primary" onPress={state.open}>
        + Crear tour
      </Button>

      <Modal.Backdrop
        isDismissable={!isSubmitting}
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
      >
        <Modal.Container size="lg" className="overflow-visible">
          <Modal.Dialog className="overflow-visible">
            {() => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Crear nuevo tour</Modal.Heading>
                </Modal.Header>

                <Modal.Body className="overflow-visible">
                  <form
                    className="flex flex-col gap-4"
                    id="create-tour-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Name */}
                    <Controller
                      control={control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <TextField
                          isInvalid={!!fieldState.error}
                          name={field.name}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                        >
                          <Label>Nombre del tour</Label>
                          <Input placeholder="Ej. Tour por el centro histórico" />
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </TextField>
                      )}
                    />

                    {/* Description */}
                    <Controller
                      control={control}
                      name="description"
                      render={({ field, fieldState }) => (
                        <TextField
                          isInvalid={!!fieldState.error}
                          name={field.name}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                        >
                          <Label>Descripción</Label>
                          <TextArea
                            className="min-h-20"
                            placeholder="Describe la experiencia del tour..."
                          />
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </TextField>
                      )}
                    />

                    {/* Duration + Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        control={control}
                        name="durationMinutes"
                        render={({ field, fieldState }) => (
                          <NumberField
                            isInvalid={!!fieldState.error}
                            minValue={15}
                            maxValue={1440}
                            name={field.name}
                            step={15}
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <Label>Duración (min)</Label>
                            <NumberField.Group>
                              <NumberField.DecrementButton />
                              <NumberField.Input className="w-full" />
                              <NumberField.IncrementButton />
                            </NumberField.Group>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                          </NumberField>
                        )}
                      />

                      <Controller
                        control={control}
                        name="pricePerPerson"
                        render={({ field, fieldState }) => (
                          <NumberField
                            isInvalid={!!fieldState.error}
                            minValue={0}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            formatOptions={{
                              style: "currency",
                              currency: "COP",
                              maximumFractionDigits: 0,
                            }}
                          >
                            <Label>Precio por persona</Label>
                            <NumberField.Group>
                              <NumberField.DecrementButton />
                              <NumberField.Input className="w-full" />
                              <NumberField.IncrementButton />
                            </NumberField.Group>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                          </NumberField>
                        )}
                      />
                    </div>

                    {/* Max Capacity (full width) */}
                    <Controller
                      control={control}
                      name="maxCapacity"
                      render={({ field, fieldState }) => (
                        <NumberField
                          isInvalid={!!fieldState.error}
                          minValue={1}
                          maxValue={500}
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <Label>Capacidad máxima</Label>
                          <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input className="w-32" />
                            <NumberField.IncrementButton />
                          </NumberField.Group>
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </NumberField>
                      )}
                    />

                    {/* Category + City selects */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category — populated from /api/categories */}
                      <Controller
                        control={control}
                        name="categoryId"
                        render={({ field, fieldState }) => (
                          <Select
                            fullWidth
                            isDisabled={categoriesLoading}
                            isInvalid={!!fieldState.error}
                            value={field.value ? String(field.value) : null}
                            placeholder={
                              categoriesLoading
                                ? "Cargando..."
                                : "Selecciona una categoría"
                            }
                            onChange={(key) =>
                              field.onChange(key ? Number(key) : undefined)
                            }
                          >
                            <Label>Categoría</Label>
                            <Select.Trigger>
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                {categories.map((cat) => (
                                  <ListBox.Item
                                    key={cat.id}
                                    id={String(cat.id)}
                                    textValue={cat.name}
                                  >
                                    {cat.name}
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                          </Select>
                        )}
                      />

                      {/* City — populated from /api/cities */}
                      <Controller
                        control={control}
                        name="cityId"
                        render={({ field, fieldState }) => (
                          <Select
                            fullWidth
                            isDisabled={citiesLoading}
                            isInvalid={!!fieldState.error}
                            value={field.value ? String(field.value) : null}
                            placeholder={
                              citiesLoading
                                ? "Cargando..."
                                : "Selecciona una ciudad"
                            }
                            onChange={(key) =>
                              field.onChange(key ? Number(key) : undefined)
                            }
                          >
                            <Label>Ciudad</Label>
                            <Select.Trigger>
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                {cities.map((city) => (
                                  <ListBox.Item
                                    key={city.id}
                                    id={String(city.id)}
                                    textValue={city.name}
                                  >
                                    {city.name}
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                          </Select>
                        )}
                      />
                    </div>

                    {/* Server error */}
                    {errors.root?.serverError && (
                      <div className="rounded-lg bg-danger/10 border border-danger/20 px-3 py-2">
                        <p className="text-sm text-danger font-medium">
                          ⚠️ {errors.root.serverError.message}
                        </p>
                      </div>
                    )}
                  </form>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    isDisabled={isSubmitting}
                    variant="secondary"
                    onPress={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    form="create-tour-form"
                    isDisabled={isSubmitting}
                    isPending={isSubmitting}
                    type="submit"
                  >
                    {({ isPending: pending }) =>
                      pending ? (
                        <>
                          <Spinner color="current" size="sm" />
                          Creando...
                        </>
                      ) : (
                        "Crear tour"
                      )
                    }
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
