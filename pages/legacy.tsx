import classNames from 'classnames';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Layout } from '../components/Layout';
import { previews } from '../data/defaultPreviews';
import { Spinner } from '../components/loaders/Spinner';
import Link from 'next/link';

export default function LegacyPage(): ReactElement {
  const [owner, setOwner] = useState('pqt');
  const [repo, setRepo] = useState('social-preview');
  const [token, setToken] = useState('');
  const [repoId, setRepoId] = useState('');
  const [preview, setPreview] = useState(previews.legacy);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (preview === '') {
      setPreview(previews.legacy);
    }
  }, [preview]);

  const validationSchema = yup.object().shape({
    owner: yup.string().required('Owner (or Organization) is required'),
    repo: yup.string().required('Repository is required'),
    token: yup.string(),
  });

  const {
    errors,
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: 'onChange', validationSchema });

  const handleOwnerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setOwner(event.currentTarget.value);
  };
  const handleRepoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRepo(event.currentTarget.value);
  };
  const handleTokenChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setToken(event.currentTarget.value);
  };

  const onSubmit = handleSubmit(async ({ owner, repo, token }) => {
    let endpoint = `/api/github-legacy/${owner}/${repo}`;

    if (token) {
      endpoint = endpoint.concat(`?token=${token}`);
    }

    const response = await fetch(endpoint.toString());
    const { data } = await response.json();

    setShowNotification(false);
    setNotificationMessage('');

    if (!data.error) {
      setPreview(data.image);
      setRepoId(data.id);
    } else {
      setNotificationMessage(data.error);
      setShowNotification(true);
    }
  });

  return (
    <Layout>
      {/* <Preview  /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <div
            className={classNames([
              'relative inline-flex shadow-sm rounded border border-gray-300 bg-gray-100 p-1 md:p-2 lg:p-3 overflow-hidden transition-opacity items-center',
              isSubmitting && 'opacity-50',
            ])}
          >
            <img src={preview} className="w-full rounded border bg-gray-300" />
            {isSubmitting && (
              <div className="absolute inset-0 flex justify-center items-center">
                <Spinner size={60} />
              </div>
            )}
          </div>

          {showNotification && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm leading-5 font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm leading-5 text-red-700">
                    <p>{notificationMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row w-full space-y-4 md:space-x-8 md:space-y-0">
                <div className="flex-1">
                  <label htmlFor="owner" className="block text-sm font-medium leading-5 text-gray-700">
                    Owner / Organization
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      className={classNames([
                        'form-input block w-full pr-10 sm:text-sm sm:leading-5',
                        errors?.owner
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
                          : 'text-gray-700',
                      ])}
                      placeholder="pqt"
                      name="owner"
                      ref={register()}
                      onChange={handleOwnerChange}
                      disabled={isSubmitting}
                      defaultValue={owner}
                    />

                    {errors?.owner && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {errors?.owner && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {(errors?.owner as FieldError)?.message}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label htmlFor="repo" className="block text-sm font-medium leading-5 text-gray-700">
                    Repository
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      className={classNames([
                        'form-input block w-full pr-10 sm:text-sm sm:leading-5',
                        errors?.repo
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
                          : 'text-gray-700',
                      ])}
                      placeholder="social-preview"
                      name="repo"
                      ref={register()}
                      onChange={handleRepoChange}
                      disabled={isSubmitting}
                      defaultValue={repo}
                    />

                    {errors?.repo && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {errors?.repo && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {(errors?.repo as FieldError)?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-8 pb-6">
                <div className="flex-1 flex space-x-4">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                      disabled={isSubmitting || !isValid}
                    >
                      Generate
                    </button>
                  </span>

                  <a
                    className={classNames([
                      'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition transform ease-in-out duration-300',
                      repoId ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none',
                    ])}
                    href={preview}
                    download={`${owner}-${repo}.png`}
                  >
                    Download
                  </a>
                </div>

                <div className="flex-1">
                  {/* <label htmlFor="repo" className="block text-sm font-medium leading-5 text-gray-700">
                    Repository
                  </label> */}
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      className={classNames([
                        'form-input block w-full pr-10 sm:text-sm sm:leading-5',
                        errors?.token
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
                          : 'text-gray-700',
                      ])}
                      placeholder="GitHub personal access token (optional)"
                      name="token"
                      ref={register()}
                      onChange={handleTokenChange}
                      disabled={isSubmitting}
                      defaultValue={token}
                    />

                    {errors?.token && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {errors?.token && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {(errors?.token as FieldError)?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed bottom-40 sm:bottom-32 inset-x-0 pb-2 sm:pb-5 z-50">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="p-2 rounded-lg bg-blue-600 shadow-lg sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-blue-800">
                  {/* <!-- Heroicon name: speakerphone --> */}
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">Social Preview has received an update!</span>
                  <span className="hidden md:inline">
                    This is legacy! Social Preview has received an update with more options.
                  </span>
                </p>
              </div>
              <div className="mt-2 flex-shrink-0 w-full sm:mt-0 sm:w-auto">
                <div className="rounded-md shadow-sm">
                  <Link href="/">
                    <a className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
