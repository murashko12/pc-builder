'use client'

import { Component } from "@/lib/types";
import { saveBuildAction, SaveBuildFromState } from "../actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
}

const initialState: SaveBuildFromState = { status: 'idle' };

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath
}: Props) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus()
  const [ state, formAction ] = useActionState(saveBuildAction, initialState)

  const componentIds = useMemo(() => {
    return Object
      .values(selectedByCategory)
      .filter((component): component is Component => component !== null)
      .map((component) => component.id)
  }, [selectedByCategory])

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Сборка сохранена')
      formRef.current?.reset();
      onOpenChange(false);
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        router.refresh()
      }
    }
  }, [onOpenChange, redirectPath, router, state.status])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить сборку</DialogTitle>
          <DialogDescription>Введите название сборки</DialogDescription>
        </DialogHeader>
        <form 
          ref={formRef} 
          action={formAction}
          className="space-y-4"
        >
          <Input 
            name="name"
            placeholder="Например: Игровой ПК"
            defaultValue={defaultName}
            required
          />
          <input type="hidden" name="componentIds" value={componentIds.join(',')} />
          <DialogFooter>
            <Button type='submit' disabled={pending || componentIds.length === 0}>
              { pending ? 'Сохраниение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}