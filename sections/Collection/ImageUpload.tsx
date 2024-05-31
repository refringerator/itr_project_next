"use client";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import { createClient } from "@/utils/supabase/client";
import { collectionBucketName } from "@/constants";
import { useContext } from "react";
import { Context } from "@/context/context-provider";
import { useTranslations } from "next-intl";

interface ImageUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const t = useTranslations("Components.ImageUpload");
  const context = useContext(Context);
  const supabase = createClient();

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    onChange?.(
      fileList.map((file) => ({ ...file, url: file.response?.url || file.url }))
    );
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    fileList: value,
    onChange: handleChange,
    onRemove,
  };

  return (
    <Upload
      {...uploadProps}
      maxCount={1}
      listType="picture"
      customRequest={async ({ file, onError, onSuccess }) => {
        const rcFile = file as File;

        const uid = context?.user?.id || "";
        const fileExt = rcFile.name.split(".").pop();
        const fileUrl = `${uid}-${Math.random()}.${fileExt}`;

        const { error } = await supabase.storage
          .from(collectionBucketName)
          .upload(fileUrl, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          return onError?.(error);
        }
        const { data } = await supabase.storage
          .from(collectionBucketName)
          .getPublicUrl(fileUrl);

        onSuccess?.({ url: data?.publicUrl });
      }}
    >
      <Button icon={<UploadOutlined />}>{t("clickToUpload")}</Button>
    </Upload>
  );
};

export default ImageUpload;
