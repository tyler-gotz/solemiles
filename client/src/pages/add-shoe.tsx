import { getApiServer } from '@/api/apiServer'
import { postShoe } from '@/api/shoeApi'
import Navigation from '@/components/navigation'
import { toaster } from '@/components/ui/toaster'
import { Box, Button, Card, Field, Input, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import useSWRMutation from 'swr/mutation'

const initialShoeValues = {
    name: '',
    brand: '',
    model: '',
    purchaseDate: new Date().toISOString().split('T')[0]
}

const AddShoe: React.FC = () => {
    const navigate = useNavigate()

    const shoeForm = useForm({
        defaultValues: initialShoeValues
    })

    const { trigger, isMutating } = useSWRMutation(`${getApiServer()}/shoes`, postShoe)

    const handleSubmit = shoeForm.handleSubmit(async (data) => {
        await trigger(data, {
            onSuccess: (response) => {
                toaster.create({
                    title: 'Shoe Added',
                    description: `Successfully added ${response.name} to your collection!`,
                    type: 'success',
                    closable: true,
                })

                navigate(`/shoes`)
            },
            onError: (error) => {
                toaster.create({
                    title: 'Error Adding Shoe',
                    description: error instanceof Error ? error.message : 'An unknown error occurred.',
                    type: 'error',
                    closable: true,
                })
            }
        });
    })

    return (
        <Box minHeight="100vh" background="gray.50">
            <Navigation />
            <Box
                as="main"
                maxWidth="2xl"
                mx="auto"
                px={{ base: 4, sm: 6, lg: 8 }}
                py={8}
            >
                <Text
                    as="h1"
                    fontSize="3xl"
                    mb={8}
                >
                    Add New Shoe
                </Text>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Shoe Details</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form
                            noValidate
                            className='space-y-4'
                            onSubmit={handleSubmit}
                        >
                            <Field.Root invalid={!!shoeForm.formState.errors.name}>
                                <Field.Label htmlFor='name'>Shoe Name <Field.RequiredIndicator /></Field.Label>
                                <Input
                                    id='name'
                                    required
                                    placeholder='e.g., My Running Shoes'
                                    {...shoeForm.register('name', {
                                        required: 'Shoe name is required'
                                    })}
                                />

                                <Field.ErrorText>{shoeForm.formState.errors.name?.message}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!shoeForm.formState.errors.brand}>
                                <Field.Label htmlFor='brand'>Brand <Field.RequiredIndicator /></Field.Label>
                                <Input
                                    id='brand'
                                    required
                                    placeholder='e.g., Nike, Adidas'
                                    {...shoeForm.register('brand', {
                                        required: 'Brand is required'
                                    })}
                                />
                                <Field.ErrorText>{shoeForm.formState.errors.brand?.message}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!shoeForm.formState.errors.model}>
                                <Field.Label htmlFor='model'>Model <Field.RequiredIndicator /></Field.Label>
                                <Input
                                    id='model'
                                    required
                                    placeholder='e.g., Air Zoom Pegasus 40'
                                    {...shoeForm.register('model', {
                                        required: 'Model is required'
                                    })}
                                />
                                <Field.ErrorText>{shoeForm.formState.errors.model?.message}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!shoeForm.formState.errors.purchaseDate}>
                                <Field.Label htmlFor='purchaseDate'>Purchase Date <Field.RequiredIndicator /></Field.Label>
                                <Input
                                    id='purchaseDate'
                                    required
                                    type='date'
                                    {...shoeForm.register('purchaseDate', {
                                        required: 'Purchase date is required'
                                    })}
                                />
                                <Field.ErrorText>{shoeForm.formState.errors.purchaseDate?.message}</Field.ErrorText>
                            </Field.Root>
                            <Box
                                display="flex"
                                gap={3}
                                pt={4}
                            >
                                <Button
                                    type='submit'
                                    flex={1}
                                    disabled={isMutating}
                                >
                                    {isMutating ? <Spinner size="sm" /> : 'Add Shoe'}
                                </Button>
                                <Button
                                    type='button'
                                    variant="outline"
                                    flex={1}
                                    disabled={isMutating}
                                    onClick={() => navigate("/shoes")}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    </Card.Body>
                </Card.Root>
            </Box>
        </Box>
    )
}

export default AddShoe