'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import { Component, ComponentCategory } from "@/lib/types";
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Zap } from "lucide-react";
import { ElementType, useState } from "react";
import { AddComponentDailogContent } from './add-component-dialog';

const iconMap: Record<ComponentCategory['icon'], ElementType> = {
    Cpu,
    Monitor,
    Server,
    MemoryStick,
    HardDrive,
    Zap,
    Box,
    Fan
}

type CategoryRow = {
    id: string;
    name: string;
    icon: string;
}

type Props = {
    components: CategoryRow[];
    selectedByCategory: Record<string, Component | null>;
    onSelectedComponent: ( categoryId: string, component: Component | null ) => void;
}

export function TableParts({
    components,
    selectedByCategory,
    onSelectedComponent
}: Props) {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)
    const totalPrice = Object.values(selectedByCategory).reduce(
        (sum, c) => sum + (c?.price ?? 0), 0
    )
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-25'>Компонент</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Модель</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead className='text-right'>Дейстаие</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    components.map((category) => {
                        const Icon = iconMap[category.icon]
                        const selected = selectedByCategory[category.id]
                        return (
                            <TableRow key={category.id} className='my-2'>
                                <TableCell>
                                    <div className="flex tems-center">
                                        <Icon className="h-5 w-5 mr-1"/>
                                    </div>
                                </TableCell>
                                <TableCell className='font-bold'>{category.name}</TableCell>
                                <TableCell>{selected?.name ?? '-'}</TableCell>
                                <TableCell>{selected?.price ?? '-'}</TableCell>
                                <TableCell className='text-right'>
                                    <Dialog
                                        open={openCategoryId === category.id}
                                        onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                                    >
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant={"outline"} 
                                                size={"sm"}
                                                className={"cursor-pointer"}
                                            >
                                                <Plus className='h-4 w-4 mr-1' />
                                                { selected ? 'Изменить' : 'Добавить'}
                                            </Button>
                                        </DialogTrigger>
                                        <AddComponentDailogContent 
                                            categoryId={category.id} 
                                            categoryName={category.name} 
                                            onSelect={
                                                (component) => {
                                                    onSelectedComponent(category.id, component)
                                                    setOpenCategoryId(null)
                                                } 
                                            }                                        
                                        />
                                    </Dialog>
                                </TableCell>
                            </TableRow> 
                        )
                    })
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5} className="rounded-2xl">
                        <p className="font-medium">Цена сборки:</p>
                        <p className="font-large text-gray-500">
                            { new Intl.NumberFormat('ru-Ru').format(totalPrice) }
                        </p>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}