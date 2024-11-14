import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Check, EllipsisVertical, Plus, SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import Input from '@/components/common/Input'
import { trpc } from '@/trpc/client'
import { cn } from '@/utils/cn'

import CopyToClipboard from './CopyToClipboard'
import { ViewVariable } from './ViewVariable'
import { addNewVariableScheme, addVariableDataType } from './validator'

type Variable = { key: string; value: string; updated?: boolean }

const Variables = ({
  variables: initialVariables,
  id,
}: {
  variables: Variable[]
  id: string
}) => {
  // filter railway variables
  const serviceVariables = initialVariables?.filter(
    (variable, index) => variable && !variable?.key?.startsWith('RAILWAY'),
  )

  //initial service variables
  const [variables, setVariables] = useState<Variable[]>(serviceVariables)

  //toggle add variable form
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)

  // react-hook-form methods
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<addVariableDataType>({
    resolver: zodResolver(addNewVariableScheme),
  })

  const trpcUtils = trpc.useUtils()

  const added = variables.filter(
    variable =>
      !serviceVariables?.some(
        serviceVariable => serviceVariable.key === variable.key,
      ),
  )

  const edited = variables.filter(variable =>
    serviceVariables?.some(
      serviceVariable =>
        serviceVariable.key === variable.key &&
        serviceVariable.value !== variable.value,
    ),
  )

  const deleted = serviceVariables?.filter(
    serviceVariable =>
      !variables.some(variable => variable.key === serviceVariable.key),
  )

  const addVariable = (data: addVariableDataType) => {
    if (variables.some(variable => variable.key === data.key)) {
      toast.error(`Key "${data.key}" already exists. Please edit it instead.`)
      return
    }
    setVariables(prev => [
      ...prev,
      { key: data.key, value: data.value, updated: true },
    ])
    setAdd(false)
    reset()
  }

  // Edit an existing variable
  const editVariable = (key: string, newValue: string) => {
    setVariables(prev =>
      prev.map(variable =>
        variable.key === key
          ? {
              ...variable,
              value: newValue,
              updated: true,
            }
          : variable,
      ),
    )
  }

  // Delete a single variable
  const deleteVariable = (key: string) => {
    setVariables(prev => prev.filter(variable => variable.key !== key))
  }

  // identify new added variables or edit values

  const { mutate: updatedVariables, isPending } =
    trpc.service.updateVariables.useMutation({
      onSuccess: () => {
        toast.success(`Variables updated successfully`)
        trpcUtils.service?.getServiceById.invalidate({ id })
      },
      onError: () => {
        toast.error(`Error while updating variables`)
      },
    })

  const handleApplyChanges = () => {
    updatedVariables({
      id,
      variables,
    })
  }

  const length = added?.length + edited.length + deleted.length

  console.log('updated variables', variables)
  return (
    <motion.div className='pt-8 text-base-content'>
      {(added?.length > 0 || edited.length > 0 || deleted.length > 0) && (
        <div className='fixed left-2 top-24 flex w-full items-center justify-between rounded-md  bg-base-300 px-3 py-2 shadow-lg drop-shadow-lg md:w-[20rem]'>
          <p className='text-sm font-semibold'>
            Apply {length} {length === 1 ? 'change' : 'changes'}
          </p>
          <div className='inline-flex gap-x-2'>
            <Button
              size={'sm'}
              disabled={isPending}
              onClick={() => handleApplyChanges()}>
              Deploy Changes
            </Button>
          </div>
        </div>
      )}
      <div className='pb-4'>
        {add ? (
          <form
            onSubmit={handleSubmit(addVariable)}
            className='flex flex-col gap-2 md:flex-row'>
            <div className='w-full space-y-1'>
              <Input
                {...register('key', { required: true })}
                placeholder='Key'
                className='h-8 w-full'
              />
              <div className='text-sm text-error'>
                {errors?.key && errors?.key?.message}
              </div>
            </div>
            <div className='w-full space-y-1'>
              <Input
                {...register('value')}
                placeholder='Value'
                className='h-8 w-full'
              />
              <div className='text-sm text-error'>
                {errors?.value && errors?.value?.message}
              </div>
            </div>
            <div className='inline-flex gap-x-2'>
              <Button type='submit' className='w-full' size={'sm'}>
                <Check size={14} />
                Add
              </Button>
              <Button
                onClick={() => {
                  setAdd(false)
                }}
                type='button'
                className='w-full'
                variant={'destructive'}
                size={'sm'}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <motion.div className='inline-flex w-full items-center justify-between'>
            <p className='text-md font-semibold'>
              {serviceVariables?.length} Service Variables
            </p>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => {
                setAdd(true)
              }}>
              <Plus size={14} />
              New Variable
            </Button>
          </motion.div>
        )}
      </div>

      {/* Variables List */}
      <div className='space-y-1'>
        {variables.map((variable, index) => (
          <div
            className={cn(
              'group grid grid-cols-3 items-center gap-x-2 rounded-md border border-transparent px-2 py-1 hover:border hover:border-primary/25 hover:bg-primary/5',
              variable?.updated ? 'bg-primary/15 hover:bg-primary/15' : '',
            )}
            key={index}>
            <p className='col-span-1 line-clamp-1 text-sm font-semibold text-base-content'>
              {variable.key}
            </p>
            <div className='relative col-span-2 inline-flex items-center justify-between gap-x-2'>
              <div className='inline-flex items-center gap-x-2'>
                <ViewVariable variable={variable.value} />
                <CopyToClipboard textData={variable.value} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical
                    className='cursor-pointer text-base-content/80'
                    size={16}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={() => {
                      const newValue = prompt(
                        'Enter new value:',
                        variable.value,
                      )
                      if (newValue !== null && newValue !== variable.value) {
                        editVariable(variable.key, newValue)
                      }
                    }}>
                    <SquarePen size={14} />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='text-error'
                    onClick={() => deleteVariable(variable.key)}>
                    <Trash2 size={14} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Edit Variable */}
              {/* <button
                onClick={() => {
                  const newValue = prompt('Enter new value:', variable.value)
                  if (newValue !== null && newValue !== variable.value) {
                    editVariable(variable.key, newValue)
                  }
                }}
                className='btn btn-sm btn-outline'>
                Edit
              </button> */}

              {/* Delete Variable */}
              {/* <button
                onClick={() => deleteVariable(variable.key)}
                className='btn btn-sm btn-outline btn-danger'>
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Variables

const EditVariable = ({ variable }: { variable: Variable }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div onClick={() => setOpen(true)}></div>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update variable </DialogTitle>
          </DialogHeader>
          <Input value={variable?.value} />
        </DialogContent>
      </Dialog>
    </>
  )
}
