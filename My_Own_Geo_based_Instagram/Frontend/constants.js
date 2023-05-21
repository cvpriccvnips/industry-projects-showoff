export const API_ROOT = 'https://around-75015.appspot.com/api/v1';
export const TOKEN_KEY = 'TOKEN_KEY';
export const GEO_OPTIONS = {
 enableHighAccuracy: true,
 maximumAge        : 300000,
 timeout           : 27000,
};
export const POS_KEY = 'POS_KEY';
export const AUTH_HEADER = 'Bearer';
export const POST_TYPE_IMAGE = 'image';
export const POST_TYPE_VIDEO = 'video';
export const POST_TYPE_UNKNOWN = 'unknown';
export const LOC_SHAKE = 0.02;
export const TOPIC_AROUND = 'around';
export const TOPIC_FACE = 'face';


// 这段代码导出了一些常量，用于在应用程序中使用。以下是每个常量的解释：

// API_ROOT: 应用程序的后端API根路径，指向"https://around-75015.appspot.com/api/v1"。
// TOKEN_KEY: 用于在本地存储中保存用户令牌的键名。
// GEO_OPTIONS: 包含地理位置选项的对象，用于获取用户位置。选项包括：
// enableHighAccuracy：是否启用高精度定位。
// maximumAge：缓存的位置信息的最大有效期。
// timeout：获取位置的超时时间。
// POS_KEY: 用于在本地存储中保存用户位置的键名。
// AUTH_HEADER: 用于身份验证的请求头部，格式为"Bearer"。
// POST_TYPE_IMAGE: 帖子类型为图片。
// POST_TYPE_VIDEO: 帖子类型为视频。
// POST_TYPE_UNKNOWN: 帖子类型未知。
// LOC_SHAKE: 地理位置抖动的程度。它表示经纬度上的偏移量，用于在地图上显示周围的帖子。
// TOPIC_AROUND: 周围话题的名称。
// TOPIC_FACE: 脸部话题的名称。
// 这些常量可以在应用程序中使用，例如用于构建API请求、本地存储操作、帖子类型判断等。