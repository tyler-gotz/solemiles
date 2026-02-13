import { getApiServer } from '@/api/apiServer'
import { postRun } from '@/api/runApi'
import type { RunType } from '@/types/runType'
import { Box, Button, Dialog, Field, Input, NativeSelect, Portal, Spinner } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import { toaster } from './ui/toaster'
import { mutate } from 'swr'

const initialFormState = {
    date: new Date().toISOString().split('T')[0],
    distance: 0,
    type: "outdoor" as RunType,
    notes: '',
}

type LogRunProps = {
    shoeId: string
}

const LogRun: React.FC<LogRunProps> = ({ shoeId }) => {
    const [open, setOpen] = useState(false)

    const runForm = useForm({
        defaultValues: initialFormState
    })

    const { trigger, isMutating } = useSWRMutation(`${getApiServer()}/runs`, postRun)

    const handleSubmit = runForm.handleSubmit(async (data) => {

        const payload = {
            ...data,
            shoeId
        }

        await trigger(payload, {
            onSuccess: (response) => {
                toaster.create({
                    title: 'Run Logged',
                    description: `Successfully logged your run on ${response.date}!`,
                    type: 'success',
                    closable: true,
                })

                setOpen(false)
                runForm.reset(initialFormState)
                mutate(`${getApiServer()}/runs?shoeId=${shoeId}`)
            },
            onError: (error) => {
                toaster.create({
                    title: 'Error Logging Run',
                    description: error instanceof Error ? error.message : 'An unknown error occurred.',
                    type: 'error',
                    closable: true,
                })
            }
        })

    })

    return (
        <Dialog.Root
            size="md"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <Dialog.Trigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                >
                    <Box
                        as={Plus}
                        boxSize="1rem"
                        mr={2}
                    />
                    Log Run
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Log a New Run</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form
                                noValidate
                                onSubmit={handleSubmit}
                                className='space-y-4'
                            >
                                <Field.Root
                                    invalid={!!runForm.formState.errors.date}
                                >
                                    <Field.Label htmlFor='date'>Date <Field.RequiredIndicator /></Field.Label>
                                    <Input
                                        id='date'
                                        required
                                        type='date'
                                        {...runForm.register('date', {
                                            required: 'Date is required'
                                        })}
                                    />
                                    <Field.ErrorText>{runForm.formState.errors.date?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root
                                    invalid={!!runForm.formState.errors.distance}
                                >
                                    <Field.Label htmlFor='distance'>Distance (miles) <Field.RequiredIndicator /></Field.Label>
                                    <Input
                                        id='distance'
                                        required
                                        type='number'
                                        step='0.1'
                                        placeholder='5.0'
                                        {...runForm.register('distance', {
                                            required: 'Distance is required'
                                        })}
                                    />
                                    <Field.ErrorText>{runForm.formState.errors.distance?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root
                                    invalid={!!runForm.formState.errors.type}
                                >
                                    <Field.Label htmlFor='type'>Type <Field.RequiredIndicator /></Field.Label>
                                    <NativeSelect.Root>
                                        <NativeSelect.Field
                                            id='type'
                                            placeholder='Select option'
                                            {...runForm.register('type', {
                                                required: 'Run type is required'
                                            })}
                                        >
                                            <option value='outdoor'>Outdoor</option>
                                            <option value='treadmill'>Treadmill</option>
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                    <Field.ErrorText>{runForm.formState.errors.type?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label htmlFor='notes'>Notes (optional)</Field.Label>
                                    <Input
                                        id='notes'
                                        placeholder='How did the run feel? Any highlights?'
                                        {...runForm.register('notes')}
                                    />
                                </Field.Root>
                                <Button
                                    type='submit'
                                    width="full"
                                    disabled={isMutating}
                                >
                                    {isMutating ? <Spinner size='sm' /> : 'Log Run'}
                                </Button>
                            </form>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default LogRun