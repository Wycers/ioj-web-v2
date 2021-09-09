import http from '@/utils/http';

export function createVolume(): Record<string, any> {
  return http.post('/volume');
}

export function getVolume(volumeName: string): Record<string, any> {
  return http.get(`/volume/${volumeName}`);
}

export function createFile(
  volumeName: string,
  formData: FormData
): Record<string, any> {
  return http.post(`/volume/${volumeName}/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
