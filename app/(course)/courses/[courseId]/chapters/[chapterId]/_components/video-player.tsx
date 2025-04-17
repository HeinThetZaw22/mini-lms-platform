"use client";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  playbackId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  courseId,
  chapterId,
  playbackId,
  nextChapterId,
  title,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  console.log("completeOnEnd", completeOnEnd);
  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress Updated");
        router.refresh();

        if (nextChapterId) {
          setTimeout(() => {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
          }, 300);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" relative aspect-video">
      {!isReady && !isLocked && (
        <div className=" absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className=" size-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className=" absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className=" size-8" />
          <p className=" text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {
            console.log("onEnded");
            onEnd();
          }}
          playbackId={playbackId}
          autoPlay
        />
      )}
    </div>
  );
};
