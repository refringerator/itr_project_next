"use client";

// import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { createClient } from "@/utils/supabase/client";

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const ImageUpload = ({ value, onChange }: AliyunOSSUploadProps) => {
  const supabase = createClient();

  const handleChange: UploadProps["onChange"] = ({ fileList, file }) => {
    console.log("Aliyun OSS:", fileList);
    console.log({ file });
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps["data"] = (file) => ({
    key: file.url,
    // OSSAccessKeyId: OSSData?.accessId,
    // policy: OSSData?.policy,
    // Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
    console.log("beforeUpload", { file });
    // if (!OSSData) return false;

    // const expire = Number(OSSData.expire) * 1000;

    // if (expire < Date.now()) {
    //   await init();
    // }

    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    // @ts-ignore
    file.url = filename;

    return file;
  };

  const uploadProps: UploadProps = {
    name: "file",
    fileList: value,
    // action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    // data: getExtraData,
    // beforeUpload,
  };

  return (
    <Upload
      {...uploadProps}
      maxCount={1}
      listType="picture"
      customRequest={async ({ file, onError, onSuccess }) => {
        const rcFile = file as File;

        const uid = 123;
        const fileExt = rcFile.name.split(".").pop();
        const fileUrl = `${uid}-${Math.random()}.${fileExt}`;

        const { error } = await supabase.storage
          .from("collection")
          .upload(fileUrl, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          return onError?.(error);
        }
        const { data, error: urlError } = await supabase.storage
          .from("collection")
          .getPublicUrl(fileUrl);

        if (urlError) {
          console.log({ urlError });
          return onError?.(urlError);
        }

        console.log(data?.publicUrl);

        onSuccess?.({ url: data?.publicUrl }, new XMLHttpRequest());
      }}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default ImageUpload;
