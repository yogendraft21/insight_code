import { apiRequest } from '../client';

export interface PrepareInstallationResponse {
  installationUrl: string;
}

export interface InstallationStatus {
  installed: boolean;
  organizationName: string | null;
  accountLogin: string | null;
  gitlabConnected: boolean;
}

export const prepareInstallation = async (): Promise<PrepareInstallationResponse> => {
  return apiRequest<PrepareInstallationResponse>({
    url: '/github/prepare-installation',
    method: 'POST',
  });
};

export const getInstallationStatus = async (): Promise<InstallationStatus> => {
  return apiRequest<InstallationStatus>({
    url: '/github/installation-status',
    method: 'GET',
  });
};