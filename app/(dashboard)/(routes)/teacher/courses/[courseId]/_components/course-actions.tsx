"use client";

import { ConfirmModal } from "@/components/modals/confirm-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



interface CourseActionsProps  {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const CourseActions = (props: CourseActionsProps) => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handlePublish = async() => {
        try {
            setLoading(true);
            if(props.isPublished) {
                await axios.patch(`/api/courses/${props.courseId}/unpublish`);
                toast.success("Course unpublished")
            } else {
                await axios.patch(`/api/courses/${props.courseId}/publish`);
                toast.success("Course published")
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const onDelete = async() => {
        try {
            setLoading(true);
            await axios.delete(`/api/courses/${props.courseId}`);
            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button
            onClick={handlePublish}
            disabled={props.disabled || isLoading}
            variant="outline"
            size="sm"
            >
                {props.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" disabled={isLoading}>
                <Trash className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
            
        </div>
    )
}