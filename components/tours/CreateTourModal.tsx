"use client";

import type { Key } from "@heroui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  EmptyState,
  FieldError,
  Input,
  Label,
  ListBox,
  ListLayout,
  Modal,
  NumberField,
  SearchField,
  Spinner,
  TextArea,
  TextField,
  Virtualizer,
  useFilter,
  useOverlayState,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { createTourAction } from "@/app/tours/actions";
import { categoryQueries } from "@/lib/queries/category-queries";
import { cityQueries } from "@/lib/queries/city-queries";
import {
  createTourSchema,
  type CreateTourInput,
} from "@/lib/schemas/tour.schema";

export function CreateTourModal() {
  const router = useRouter();
  const state = useOverlayState();
  const { contains } = useFilter({ sensitivity: "base" });

  // These queries read from the server-prefetched cache — no browser requests
  const { data: cities = [], isLoading: citiesLoading } = useQuery(
    cityQueries.list(),
  );
  const { data: categories = [], isLoading: categoriesLoading } = useQuery(
    categoryQueries.list(),
  );

  // Controlled search state for each autocomplete
  const [citySearch, setCitySearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const filteredCities = cities.filter((c) =>
    contains(c.name, citySearch),
  );
  const filteredCategories = categories.filter((c) =>
    contains(c.name, categorySearch),
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
    const result = await createTourAction(data);

    if (!result.success) {
      setError("root.serverError", { message: result.message });
      return;
    }

    // router.refresh() re-runs the Server Component on the server,
    // fetching the updated tours list without exposing BACKEND_URL to the client
    router.refresh();
    reset();
    setCitySearch("");
    setCategorySearch("");
    state.close();
  };

  const handleClose = () => {
    reset();
    setCitySearch("");
    setCategorySearch("");
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
        <Modal.Container size="lg">
          <Modal.Dialog>
            {() => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Crear nuevo tour</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
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

                    {/* Max Capacity */}
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

                    {/* Category + City — Autocomplete with virtualization */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category */}
                      <Controller
                        control={control}
                        name="categoryId"
                        render={({ field, fieldState }) => (
                          <Autocomplete
                            allowsEmptyCollection
                            fullWidth
                            isDisabled={categoriesLoading}
                            isInvalid={!!fieldState.error}
                            placeholder={
                              categoriesLoading ? "Cargando..." : "Categoría"
                            }
                            selectionMode="single"
                            value={field.value ? String(field.value) : null}
                            onChange={(key: Key | Key[] | null) =>
                              field.onChange(key ? Number(key as Key) : undefined)
                            }
                          >
                            <Label>Categoría</Label>
                            <Autocomplete.Trigger>
                              <Autocomplete.Value />
                              <Autocomplete.ClearButton />
                              <Autocomplete.Indicator />
                            </Autocomplete.Trigger>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                            <Autocomplete.Popover>
                              <Autocomplete.Filter
                                inputValue={categorySearch}
                                onInputChange={setCategorySearch}
                              >
                                <SearchField
                                  autoFocus
                                  aria-label="Buscar categoría"
                                  name="category-search"
                                  variant="secondary"
                                >
                                  <SearchField.Group>
                                    <SearchField.SearchIcon />
                                    <SearchField.Input placeholder="Buscar..." />
                                    <SearchField.ClearButton />
                                  </SearchField.Group>
                                </SearchField>
                                <Virtualizer
                                  layout={ListLayout}
                                  layoutOptions={{ rowHeight: 36 }}
                                >
                                  <ListBox
                                    items={filteredCategories}
                                    renderEmptyState={() => (
                                      <EmptyState>Sin resultados</EmptyState>
                                    )}
                                  >
                                    {(cat) => (
                                      <ListBox.Item
                                        id={String(cat.id)}
                                        textValue={cat.name}
                                      >
                                        {cat.name}
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    )}
                                  </ListBox>
                                </Virtualizer>
                              </Autocomplete.Filter>
                            </Autocomplete.Popover>
                          </Autocomplete>
                        )}
                      />

                      {/* City */}
                      <Controller
                        control={control}
                        name="cityId"
                        render={({ field, fieldState }) => (
                          <Autocomplete
                            allowsEmptyCollection
                            fullWidth
                            isDisabled={citiesLoading}
                            isInvalid={!!fieldState.error}
                            placeholder={
                              citiesLoading ? "Cargando..." : "Ciudad"
                            }
                            selectionMode="single"
                            value={field.value ? String(field.value) : null}
                            onChange={(key: Key | Key[] | null) =>
                              field.onChange(key ? Number(key as Key) : undefined)
                            }
                          >
                            <Label>Ciudad</Label>
                            <Autocomplete.Trigger>
                              <Autocomplete.Value />
                              <Autocomplete.ClearButton />
                              <Autocomplete.Indicator />
                            </Autocomplete.Trigger>
                            {fieldState.error && (
                              <FieldError>{fieldState.error.message}</FieldError>
                            )}
                            <Autocomplete.Popover>
                              <Autocomplete.Filter
                                inputValue={citySearch}
                                onInputChange={setCitySearch}
                              >
                                <SearchField
                                  autoFocus
                                  aria-label="Buscar ciudad"
                                  name="city-search"
                                  variant="secondary"
                                >
                                  <SearchField.Group>
                                    <SearchField.SearchIcon />
                                    <SearchField.Input placeholder="Buscar..." />
                                    <SearchField.ClearButton />
                                  </SearchField.Group>
                                </SearchField>
                                <Virtualizer
                                  layout={ListLayout}
                                  layoutOptions={{ rowHeight: 36 }}
                                >
                                  <ListBox
                                    items={filteredCities}
                                    renderEmptyState={() => (
                                      <EmptyState>Sin resultados</EmptyState>
                                    )}
                                  >
                                    {(city) => (
                                      <ListBox.Item
                                        id={String(city.id)}
                                        textValue={city.name}
                                      >
                                        {city.name}
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    )}
                                  </ListBox>
                                </Virtualizer>
                              </Autocomplete.Filter>
                            </Autocomplete.Popover>
                          </Autocomplete>
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
