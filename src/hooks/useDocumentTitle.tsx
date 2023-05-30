import { useEffect } from "react";

interface IProps {
  title: string;
}

export default function useDocumentTitle({ title }: IProps) {
  useEffect(() => {
    document.title = title;
  });
}
