package main

import (
    "context"
    "encoding/json"
    "errors"
    "fmt"
    "net/http"
    "io"
    "io/ioutil"
    "strings"

    "golang.org/x/oauth2/google"
)

type Prediction struct {
    Prediction int       `json:"prediction"`
    Key        string    `json:"key"`
    Scores     []float64 `json:"scores"`
}

type MLResponseBody struct {
    Predictions []Prediction `json:"predictions"`
}

type ImageBytes struct {
    B64 []byte `json:"b64"`
}

type Instance struct {
    ImageBytes ImageBytes `json:"image_bytes"`
    Key        string     `json:"key"`
}

type MLRequestBody struct {
    Instances []Instance `json:"instances"`
}

const (
    // Replace this project ID and model name with your configuration.
    PROJECT = "around-179500"
    MODEL  = "face_face"
    URL    = "https://ml.googleapis.com/v1/projects/" + PROJECT + "/models/" + MODEL + ":predict"
    SCOPE  = "https://www.googleapis.com/auth/cloud-platform"
)

// Annotate a image file based on ml model, return score and error if exists.
func annotate(r io.Reader) (float64, error) {
        buf, err := ioutil.ReadAll(r)
        if err != nil {
                fmt.Printf("Cannot read image data %v\n", err)
                return 0.0, err
        }

        client, err := google.DefaultClient(context.Background(), SCOPE)
        if err != nil {
                fmt.Printf("Failed to create HTTP client %v\n", err)
                return 0.0, err
        }

        // Construct a ML request
        requestBody := &MLRequestBody {
                Instances: []Instance {
                        {
                                ImageBytes: ImageBytes {
                                        B64: buf,
                                },
                                Key: "1",
                        },
                },
        }
        jsonRequestBody, err := json.Marshal(requestBody)
        if err != nil {
                fmt.Printf("Failed to create ML request body %v\n", err)
                return 0.0, err
        }

        request, err := http.NewRequest("POST", URL, strings.NewReader(string(jsonRequestBody)))

        response, err := client.Do(request)
        if err != nil {
                fmt.Printf("Failed to send ML request %v\n", err)
                return 0.0, err
        }

        jsonResponseBody, err := ioutil.ReadAll(response.Body)
        if err != nil {
                fmt.Printf("Failed to get ML response body %v\n", err)
                return 0.0, err
        }

        if len(jsonResponseBody) == 0 {
                fmt.Println("Empty prediction response body")
                return 0.0, errors.New("Empty prediction response body")
        }

        var responseBody MLResponseBody
        if err := json.Unmarshal(jsonResponseBody, &responseBody); err != nil {
                fmt.Printf("Failed to decode ML response %v\n", err)
                return 0.0, err
        }

        if len(responseBody.Predictions) == 0 {
                fmt.Println("Empty prediction result")
                return 0.0, errors.New("Empty prediction result")
        }

        results := responseBody.Predictions[0]
        fmt.Printf("Received a prediction result %f\n", results.Scores[0])
        return results.Scores[0], nil
}


/*
这段代码是一个用于进行机器学习模型预测的 Go 语言程序。它使用了 Google Cloud 的机器学习 API 进行图像分类预测。

以下是代码的主要部分：

定义了一些结构体类型，如Prediction、MLResponseBody、ImageBytes、Instance和MLRequestBody，用于定义请求和响应的数据结构。

定义了一些常量，如项目 ID、模型名称、请求的 URL 和所需的授权范围。

annotate函数是进行图像分类预测的核心函数。它接收一个io.Reader类型的图像数据，首先读取图像数据并存储到缓冲区中。

使用 Google Cloud 提供的google.DefaultClient函数创建一个 HTTP 客户端，用于发送预测请求。

构建了一个 ML 请求的请求体，包含图像数据和关键字等信息，并将其转换为 JSON 格式。

创建一个 POST 请求，并使用之前创建的客户端发送请求。

读取响应体的 JSON 数据，并将其解析为MLResponseBody类型的结构体。

检查预测结果是否为空，并获取预测结果中的分数。

最后，返回预测结果的分数和可能的错误。

这段代码实现了通过 Google Cloud 的机器学习 API 进行图像分类预测的功能。它使用给定的图像数据和模型进行预测，并返回预测结果的分数。

*/