export const MESSAGES = {
	DATABASE: {
		CONNECT_SUCCESS: '🌱 Successfully connected to the database.',
		DISCONNECT_SUCCESS: '⛔️ Successfully disconnected from the database.',
		USERNAME: 'Username credentials to access the database main',
		PASSWORD: 'Password credentials to access the database main ',
		COLLECTIONS: {
			USERS: 'Holds user information.',
			REFRESH_TOKENS: 'Holds refresh-token information.',
			OTP: 'Holds OTP data.',
			LIKES: 'Holds user likes.',
			BLOGS: 'Holds blogs.',
			TAGS: 'Holds tags.',
			COMMENTS: 'Holds comments.',
			BOOKMARKS: 'Holds bookmarks',
			BUGS: 'Hold bugs',
			SOLUTIONS: 'Hold solutions',
		},
	},
	AUTH: {
		OTP: {
			NAME: 'Gmail account display name for OTP.',
			ACCOUNT: 'Gmail account email for OTP.',
			PASSWORD: 'Gmail account password for OTP.',
		},
		JWT: {
			SECRET_KEY: 'Unique secret string for JWT, stored securely.',
			REFRESH_TOKEN_KEY: 'Unique refresh token secret string, stored securely.',
			EXPIRATION: {
				ACCESS_TOKEN: 'Access token expiration duration.',
				REFRESH_TOKEN: 'Refresh token expiration duration.',
			},
			ALGORITHM: 'List of allowed JWT algorithms.',
			OTP_SECRET: 'Security string for OTP.',
		},
		OAUTH2: {
			GOOGLE_CLIENT_ID: 'Client ID for Google authentication.',
			GOOGLE_CLIENT_SECRET: 'Client secret for Google authentication.',
			GOOGLE_CALLBACK: 'Callback URL for Google authentication.',
			FACEBOOK_APP_ID: 'Client ID for Facebook authentication.',
			FACEBOOK_APP_SECRET: 'Client secret for Facebook authentication.',
			FACEBOOK_CALLBACK: 'Callback URL for Facebook authentication.',
			GITHUB_CLIENT_ID: 'Client ID for Github authentication.',
			GITHUB_CLIENT_SECRET: 'Client secret for Github authentication.',
			GITHUB_CALLBACK: 'Callback URL for Github authentication.',
		},
	},
	ENVIRONMENT: {
		PORT: 'Server port.',
		HOST: 'Server host.',
		DEV: 'Environment is a collection of procedures and tools for developing, testing and debugging an application or program.',
		PROD: 'Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities',
		TEST: 'Testing environment setup.',
	},
	CLIENT: {
		REQUEST: {
			POINT: 'Maximum points consumable over duration.',
			DURATION: 'Seconds before points reset.',
			PASSWORD_SECRET: 'Security string for passwords.',
			OTP_SECRET: 'Security string for OTP.',
			COOKIE_EXPIRATION: 'Cookie expiration duration.',
			SECRET_COOKIE_NAME: 'Cookie name for successful login/register.',
			PATHS: {
				PROVINCE_JSON: 'Path to province.json file.',
				OPENAPI_YAML: 'Path to paths.yaml file.',
			},
			SERVER_URL: 'Backend URL.',
		},
	},
	ERROR_MESSAGES: {
		GENERAL: {
			LOGIN: 'Login process failed',
			REGISTER: 'Registration process failed',
			FIND_OTP: 'Failed to find OTP',
			GENERATED_OTP: 'OTP generation failed',
			VERIFY_OTP: 'OTP verification failed',
			VERIFY_FORGOT_PASSWORD_TOKEN: 'Forgot-password token verification failed',
			GET_ALL_USER: 'Failed to retrieve users',
			GET_ALL_ROLE: 'Failed to retrieve users role',
			GET_USER_PROFILE: 'Failed to retrieve users profile',
			UPDATE_USER: 'User update failed',
			AVATAR: 'Upload avatar failed',
			EXISTED: 'User had existed',
			GET_A_TOKEN_FROM_R_TOKEN: 'Cannot get access token',

			LOGOUT: 'Logout process failed',
			CHANGE_PASSWORD: 'Password change failed',
			FORGOT_PASSWORD: 'Forgot-password process failed',
			SEND_FAILURE: 'OTP sending failed',
			GET_ROLE_USER: 'Retrieving users by role failed',
			INSERT_TAGS: 'Tag insertion failed',
			GET_ALL_TAGS: 'Failed to retrieve all tags',
			GET_TAGS_BY_ID: 'Failed to retrieve tags by ID',
			UPDATE_TAGS: 'Tag update failed',
			DELETED_TAGS: 'Tag deletion failed',
			LIKE_PRODUCT: 'Product liking failed',
			UNLIKE_PRODUCT: 'Product unliking failed',
			GET_ALL_PRODUCT_FAVORITE:
				'Failed to retrieve all favorite products by user',
			TOKEN: 'Token is invalid',
		},
		USER_SPECIFIC: {
			NOT_FOUND: 'User not found.',
			PASSWORD_INCORRECT: 'Incorrect password.',
			ACCOUNT_LOCKED: 'Account is locked or banned.',
		},
		COURSE: {
			GET_ALL: 'Get all courses failed',
			GET_BY_ID: 'Get course by id failed',
			CREATE: 'Create course failed',
			UPDATE: 'Update course failed',
			DELETE: 'Delete course failed',
			NOT_FOUND: 'Not found course document',
		},
		LECTURE: {
			GET_ALL: 'Get all lectures failed',
			GET_BY_ID: 'Get lecture by id failed',
			CREATE: 'Create lecture failed',
			UPDATE: 'Update lecture failed',
			DELETE: 'Delete lecture failed',
			BUG_ID_NOTFOUND: 'Course ID not found',
			NOT_FOUND: 'Not found lecture document',
		},
		UPLOAD: {
			IMAGE: 'Upload image failed',
			BUG: 'Upload bug image failed',
			SOLUTION: 'Upload solution image failed',
			TOO_LARGE: 'File too large',
		},
		PROGRESS: {
			GET_ALL: 'Get all progress failed',
			GET_BY_ID: 'Get progress by id failed',
			GET_BY_USER_ID: 'Get progress by user id failed',
			CREATE: 'Create progress failed',
			UPDATE: 'Update progress failed', 
			DELETE: 'Delete progress failed',
			NOT_FOUND: 'Not found progress document',
		},
	},
	SUCCESS_MESSAGES: {
		LOGIN: 'Login successfully.',
		REGISTER: 'Registration successfully.',
		LOGOUT: 'Logout successfully.',
		DATA_RETRIEVAL: 'Data retrieval successfully.',
		DATA_MANIPULATION: 'Data manipulation successfully.',
		OTP: {
			VERIFY: 'OTP verification successfully.',
			RESEND: 'OTP resend successfully.',
		},
		AUTH: {
			GET_ALL: 'Get all user successfully',
			GET_BY_ID: 'Get user profile details by admin successfully',
			UPDATE: 'Successfully update user account',
			INSERT: 'Successfully create user account',
			DELETE: 'Successfully deleted user account ',
			GET_ROLES: 'All user role retrieved successfully.',
			GET_ROLE_BY_ID: 'Get user profile details by admin successfully',
			UPDATE_ROLE: 'Successfully update role user',
			DELETE_ROLE: 'Successfully deleted role user',
			RESET_PASSWORD: 'Reset password successfully.',
		},
		USER: {
			REFRESH_TOKEN: 'Token refreshed successfully.',
			FORGOT_PASSWORD: 'Forgot password request processed successfully.',
			VERIFY_FORGOT_PASSWORD: 'Forgot password verified successfully.',
			RESET_PASSWORD: 'Password reset successfully.',
			CHANGE_PASSWORD: 'Password changed successfully.',
			GET_LIST_ORDER_BY_USER: 'Get list orders by user successfully!',
			GET_ALL: 'All users retrieved successfully.',
			GET_BY_ID: 'User retrieved successfully.',
			GET_PROFILE: 'Profile fetched successfully.',
			UPDATE: 'Updated successfully.',
			SEARCH: 'User search completed successfully.',
			DELETE: 'User deleted successfully.',
			DELETE_MANY_USER: 'Multiple users deleted successfully.',
			GET_ROLE: 'User roles retrieved successfully.',
			EDIT_ROLE: 'User roles edited successfully.',
			GET_FAVORITE_FRIEND: 'List of close friends retrieved successfully.',
			PAGINATION: 'User pagination executed successfully.',
			TEST_TOKEN: 'Token test completed successfully.',
			GET_PRODUCT_FAVORITE: 'Favorite products retrieved successfully.',
			UPLOAD_AVATAR: 'Avatar uploaded successfully.',
			UPLOAD_THUMBNAIL: 'Thumbnail uploaded successfully.',
			UPLOAD_IMAGE: 'Image uploaded successfully.',
			UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.',
		},

		COURSE: {
			GET_ALL: 'Get all courses successfully',
			GET_BY_ID: 'Get course by id successfully',
			UPDATE: 'Update course successfully',
			CREATE: 'Create course successfully',
			DELETE: 'Delete course successfully',
		},
		LECTURE: {
			GET_ALL: 'Get all lectures successfully',
			GET_BY_ID: 'Get lecture by id successfully',
			UPDATE: 'Update lecture successfully',
			CREATE: 'Create lecture successfully',
			DELETE: 'Delete lecture successfully',
		},

		COMMENTS: {
			GET_ALL: 'Successfully retrieved all comments by product',
			GET_BY_ID: 'Successfully get comment by comment_id',
			INSERT: 'Successfully inserted comment.',
			UPDATE: 'Successfully updated comment.',
			DELETE: 'Successfully deleted comment.',
			REPLIES: 'Replies comment successfully',
			LIKE: 'Like comment successfully.',
			UNLIKE: 'Unlike comment successfully.',
		},

		BLOGS: {
			GET_ALL: 'Successfully retrieved all blog.',
			GET_BY_ID: 'Successfully retrieved blog by blog_id.',
			INSERT: 'Successfully inserted blog.',
			UPDATE: 'Successfully updated blog.',
			DELETE: 'Successfully deleted blog.',
			SEARCH: 'Search blog successfully!',
			GET_COMMENT: 'Successfully get comment by comment_id',
			INSERT_COMMENT: 'Successfully inserted comment.',
			RE_COMMENT: 'Successfully deleted comment.',
			LIKE: 'Like comment successfully.',
			UNLIKE: 'Unlike comment successfully.',
		},
		IMAGE: {
			GET_ALL: 'Successfully retrieved all images.',
			GET_BY_ID: 'Get detail image by image_id',
			CLEAR: 'Clear all image successfully',
			DELETE: 'Successfully deleted image',
			UPLOAD_IMAGE: 'Image uploaded successfully.',
			UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.',
		},

		HAGTAGS: {
			GET_ALL: 'Successfully retrieved all products in cart.',
			GET_BY_ID: 'Successfully retrieved hagtags by hagtags_id',
			INSERT: 'Successfully inserted hagtags.',
			UPDATE: 'Successfully updated hagtags',
			DELETE: 'Successfully deleted hagtags',
			DELETE_ALL: 'Successfully deleted all hagtags',
		},

		REACTION: {
			LIKE_SUCCESSFULLY: 'Liked successfully',
			UNLIKE_SUCCESSFULLY: 'Unliked successfully',
		},
		PROGRESS: {
			GET_ALL: 'Get all progress successfully',
			GET_BY_ID: 'Get progress by id successfully',
			GET_BY_USER_ID: 'Get progress by user id successfully',
			UPDATE: 'Update progress successfully',
			CREATE: 'Create progress successfully',
			DELETE: 'Delete progress successfully',
		},
	},
	VALIDATION_MESSAGES: {
		TITLE: 'Validation error.',
		COMMONS: {
			INVALID_ID: 'Invalid object ID.',
			PAGINATION: {
				INVALID_PAGE: 'Invalid page number.',
				ITEMS_OUT_OF_RANGE: 'Items per page out of valid range.',
			},
		},
		TOKEN: {
			INVALID: 'Invalid token',
			EXPIRED_TIME: 'Token has expired',
		},
		ID_INVALID: 'Id is unvalid',
		ID_IS_REQUIRED: 'Id is required',
		ID_MUST_BE_STRING: 'Id must be string',
		INVENTORY: {
			AMOUNT_IS_INVALID: 'The amount must be greater than or equal to 1.',
			INVALID_ID: 'The inventory ID is invalid.',
			NOT_FOUND: 'Inventory not found.',
			INVALID_PRODUCT_SIZE:
				'The specified size does not exist for this product.',
			ALREADY_EXISTS:
				'An inventory item for this product and size already exists.',
			ID_IS_REQUIRED: 'An inventory ID is required.',
		},
		TAGS: {
			ID_IS_REQUIRED: 'Tag ID is required.',
			ID_IS_INVALID: 'The provided Tag ID is invalid.',
			NOT_FOUND: 'The specified tags do not exist.',
			NAME_IS_REQUIRED: 'Tag name is required.',
			NAME_MUST_BE_STRING: 'Tag name must be a string.',
			NAME_LENGTH_IS_INVALID:
				'The length of the tag name must be between 4 to 30 characters.',
			TYPE_IS_REQUIRED: 'Tag type is required.',
			TYPE_MUST_BE_STRING: 'Tag type must be a string.',
			TYPE_LENGTH_IS_INVALID:
				'The length of the tag type must be between 4 to 50 characters.',
			INVALID_TAGS_ID: 'The tags_id is invalid.',
			INVALID_SORT_ORDER: 'The sorting order is invalid.',
			FIELD_UPDATE_IS_REQUIRED:
				'At least one field must be specified for updating.',
		},

		COURSE: {
			ALL_FIELD_IS_REQUIRED: 'All field is required',
			TITLE_MUST_BE_STRING: 'Title must be a string',
			TITLE_LENGTH_BETWEEN_10_AND_100:
				'Title length is from 10 to 100 characters',
			DESCRIPTION_IS_REQUIRED: 'Description is required',
			DESCRIPTION_MUST_BE_STRING: 'Description must be a string',
			DESCRIPTION_LENGTH_BETWEEN_10_AND_200:
				'Description length is from 10 to 200 characters',
			IMAGE_IS_REQUIRED: 'Image is required',
			IMAGE_MUST_BE_STRING: 'Image must be a string',
			INVALID_IMAGE: 'Invalid image',
			UPDATE_ID_IS_REQUIRED: 'Course id is required',
			UPDATE_ID_MUST_BE_STRING: 'Course id must be string',
			STATUS: 'Status is Pending or Public or Deleted',
			ID_INVALID: 'Id is invalid',
		},

		UPLOAD: {
			IMAGE: {
				INVALID_IMAGE_EXTENSION: 'Image extension is invalid.',
				INVALID_IMAGE_SIZE: 'Image size is too large.',
				MAX_IMAGE_UPLOAD: 'A maximum of 4 images can be uploaded.',
				INVALID_IMAGE_FILE_TYPE: 'File type invalid',
				FILE_NOT_FOUND: 'File not found',
			},
		},
		USER: {
			COMMONS: {
				NOT_LOGIN: 'You must be logged in to continue.',
				ID_IS_INVALID: 'User ID is invalid.',
				ID_MUST_BE_A_STRING: 'User ID must be a string.',
				ID_CAN_NOT_BE_EMPTY: 'User ID cannot be empty.',
				WITH_ID_IS_NOT_EXIST: 'User with the specified ID does not exist.',
				NOT_ROLE_NOT_SATISFIED:
					'You do not have the appropriate role to access these resources.',
				INVALID_INCLUDES: 'Invalid pagination inclusion.',
				EMAIL_OR_PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
				INVALID_BEARER_TOKEN: 'The bearer token is invalid.',
				HEADER_AUTHORIZATION_IS_INVALID: 'Authorization header is invalid.',
				NOT_VERIFIED: 'User has not verified yet',
				LOGIN_OAUTH2: 'Login oauth2 fail',
				EMAIL: {
					IS_REQUIRED: 'Email is required.',
					MUST_BE_A_STRING: 'Email must be a string.',
					ACCESSIBILITY:
						'The email address does not exist. Please use a valid one or register.',
					NOT_REGISTER: 'Email is not registered.',
					ALREADY_EXISTS: 'Email already exists.',
					VALID_EMAIL: 'Email address is invalid.',
					VALID_DOMAIN: 'Email must end with @gmail.com or @gmail.edu.com.',
					CONTAIN_SPECIAL_CHARACTER:
						'Email must contain at least one special character.',
				},
				NEW_PASSWORD: {
					IS_REQUIRED: 'New password is required.',
					MUST_BE_STRONG:
						'New password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
					LENGTH_MUST_BE_FROM_8_TO_16:
						'New password length must be between 8 and 16 characters.',
					CONTAINS_EMOJI: 'New password cannot contain emojis or whitespace.',
					MUST_BE_A_STRING: 'New password must be a string.',
					NOT_SAME_OLD_PASSWORD:
						'New password must not be the same as the old password.',
				},
				PASSWORD: {
					RESET_FAILED: 'Failed to reset password.',
					CHANGE_FAILED: 'Failed to change password.',
					IS_REQUIRED: 'Password is required.',
					MUST_BE_STRONG:
						'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
					LENGTH_MUST_BE_FROM_8_TO_16:
						'Password length must be between 8 and 16 characters.',
					CONTAINS_EMOJI: 'Password cannot contain emojis or whitespace.',
					MUST_BE_A_STRING: 'Password must be a string.',
					NOT_SAME_OLD_PASSWORD:
						'New password must not be the same as the old password.',
				},
				CONFIRM_PASSWORD: {
					IS_REQUIRED: 'Confirm_password is required.',
					MUST_BE_THE_SAME_AS_PASSWORD:
						'Confirm_password must match the password.',
					MUST_BE_A_STRING: 'Confirm_password must be a string.',
					LENGTH_MUST_BE_FROM_8_TO_16:
						'Confirm_password length must be between 8 and 16 characters.',
					MUST_BE_STRONG:
						'Confirm_password must meet the strength requirements 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
					CONTAINS_EMOJI:
						'Confirm password cannot contain emojis or whitespace.',
				},
				OLD_PASSWORD: {
					IS_REQUIRED: 'Old password is required.',
					IS_INCORRECT: 'Old password is incorrect.',
				},
			},
			TOKEN: {
				EMAIL_VERIFY: {
					IS_REQUIRED: 'An email verification token is required.',
					MUST_BE_A_STRING: 'The email verification token must be a string.',
				},
				ACCESS_TOKEN: {
					IS_REQUIRED: 'An access token is required.',
					MUST_BE_A_STRING: 'The access token must be a string.',
				},
				REFRESH_TOKEN: {
					IS_REQUIRED: 'Refresh token is required for logout.',
					IS_NOT_EXIST: 'The refresh token has been used or does not exist.',
					NOT_FOUND: 'Attempted to delete a non-existent refresh token.',
					MUST_BE_A_STRING: 'The refresh token must be a string.',
					IS_NOT_EXIST_IN_COOKIES: 'There is no refresh token in cookies.',
				},
			},
			ROLE: {
				IS_REQUIRED: 'Role is required',
				INVALID_USER_ROLE: 'User role must be valid.',
				USER_ROLE_CAN_NOT_BE_EMPTY: 'User role cannot be empty.',
				DUL_USER_ROLE: 'Updating to the same role is not allowed.',
				USER_EDIT_ROLE_THEMSELVES: 'Users cannot edit their own role.',
			},
			LIKE: {
				INVALID_ID: 'Invalid user or product target ID.',
				NOT_ALREADY_LIKE_PRODUCT: 'User has not liked the product.',
				ALREADY_LIKE_PRODUCT: 'User has already liked the product.',
			},
			LOGIN: {
				USER_NOT_FOUND: 'User not found',
				EMAIL_IS_REQUIRED: 'Email is required.',
				EMAIL_MUST_BE_A_STRING: 'Email must be a string.',
				EMAIL_INVALID: 'Email address is invalid',
				EMAIL_ACCESSIBILITY:
					'The email address does not exist. Please use a valid one or register.',
				PASSWORD_IS_REQUIRED: 'Password is required.',
				PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
				PASSWORD_MUST_BE_STRONG:
					'Password must be 8-16 characters, including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
				PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
					'Password length must be between 8 and 16 characters.',
				PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
				PASSWORD_CONTAINS_EMOJI:
					'Password cannot contains emoji symbol and white space',
				ACCOUNT_IS_UNVERIFIED: 'The account is unverified.',
				ACCOUNT_IS_BANNED: 'The account is banned.',
				ACCOUNT_NOT_FOUND: 'Account not found.',
				ACCOUNT_NOT_EXISTS: 'The user’s account has been removed.',
			},
			REGISTER: {
				INVALID_USERNAME: 'Must be a valid username',
				USERNAME_IS_REQUIRED: 'Username is required.',
				USERNAME_MUST_BE_A_STRING: 'Username must be a string.',
				USERNAME_LENGTH_MUST_BE_FROM_3_TO_30:
					'Username length must be between 3 and 30 characters.',
				USERNAME_INCLUDES_MUL_WHITESPACE:
					'Username cannot contain multiple consecutive whitespaces.',
				EMAIL_IS_REQUIRED: 'Email is required.',
				EMAIL_MUST_BE_A_STRING: 'Email must be a valid address.',
				EMAIL_ACCESSIBILITY:
					'The email address is already in use. Please use a different email.',
				PASSWORD_IS_REQUIRED: 'Password is required.',
				PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
				PASSWORD_MUST_BE_STRONG:
					'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
				PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
					'Password length must be between 8 and 16 characters.',
				PASSWORD_CAN_NOT_CONTAIN_SPACE: 'Password cannot contain spaces.',
				CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required.',
				CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string.',
				CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD:
					'Confirm password must match the password.',
				CONFIRM_PASSWORD_MUST_BE_STRONG:
					'Confirm password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
				CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
					'Confirm password length must be between 8 and 16 characters.',
				INVALID_PHONE: 'Phone number must be valid.',
				PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
				PHONE_LENGTH_MUST_BE_10_CHARACTER:
					'Phone length must be 10 or 11 characters.',
				PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
				PHONE_IS_REQUIRED: 'Phone is required.',
				PHONE_MUST_BE_STRING: 'Phone must be a string.',
				PHONE_IS_INVALID:
					'The phone number is invalid. Please enter a valid Vietnamese phone number.',
			},
			VERIFY_OTP: {
				INVALID_OTP: 'Invalid OTP.',
				IS_REQUIRED: 'OTP is required.',
				IS_NOT_EXIST: 'OTP not found.',
				MUST_BE_A_STRING: 'OTP must be a string.',
				OPT_LENGTH_MUST_BE_6: 'OTP length must be 6 characters.',
				NOT_FOUND_OR_ALREADY_VERIFIED:
					'User not found or OTP already verified.',
				IS_NUMBERIC: 'OTP must be numeric.',
				IS_EXPIRED: 'OTP has expired.',
			},
			VERIFY_FORGOT_PASSWORD_TOKEN: {
				IS_REQUIRED: 'Forgot_password token is required.',
				MUST_BE_A_STRING: 'Forgot_password token must be a string.',
				LENGTH_MUST_BE_6: 'Forgot_password token length must be 6 characters.',
				IS_NOT_EXIST: 'Forgot_password token not found.',
				IS_EXPIRED: 'Forgot_password token has expired.',
				NOT_FOUND_OR_ALREADY_VERIFIED:
					'User not found or forgot_password token already verified.',
				INVALID_TOKEN: 'Invalid forgot_password token.',
				IS_NUMBERIC: 'Forgot_password token must be numeric.',
			},
			PROFILE: {
				FIELD_UPDATE_IS_REQUIRED:
					'At least one field must be specified for updating.',
				INVALID_USERNAME: 'USERname must be valid.',
				USERNAME_INCLUDES_MUL_WHITESPACE:
					'Username cannot contain multiple consecutive whitespaces.',
				USERNAME_MUST_BE_A_STRING: 'Username must be a string.',
				USERNAME_MAX_LENGTH_IS_50:
					'Username length must be between 4 and 50 characters.',
				INVALID_PHONE: 'Phone number must be valid.',
				PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
				PHONE_LENGTH_MUST_BE_10_CHARACTER:
					'Phone length must be 10 or 11 characters.',
				PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
				PHONE_IS_REQUIRED: 'Phone is required.',
				PHONE_MUST_BE_STRING: 'Phone must be a string.',
				PHONE_IS_INVALID:
					'The phone number is invalid. Please enter a valid Vietnamese phone number.',
				GENDER_MUST_BE_STRING: 'Gender must be a string.',
				GENDER_IS_INVALID:
					'Gender is invalid. Please specify as Male, Female, Other, etc.',
				AVATAR_MUST_BE_STRING: 'Avatar image must be a string.',
				VALID_URL_AVATAR:
					'Avatar URL must be valid and have a valid image extension.',
				VALID_URL_COVER_PHOTO:
					'Cover photo URL must be valid and have a valid image extension.',
				COVER_PHOTO_MUST_BE_STRING: 'Cover photo must be a string.',
				INVALID_ADDRESS: 'Address must be valid.',
				ADDRESS_MUST_BE_STRING: 'Address must be a string.',
				ADDRESS_LENGTH_IS_INVALID:
					'Address length must be between 10 and 200 characters.',
				ADDRESS_INCLUDES_MUL_WHITESPACE:
					'Address cannot contain multiple consecutive whitespaces.',
			},
			FAVORITE: {
				FAVORITE_NOT_EXIT: 'Favorite does not exist.',
				FRIEND_ID_NOT_USER_ID: 'Friend ID is not a user ID.',
				FRIEND_ID_IS_REQUIRED: 'Friend ID is required.',
				FRIEND_ID_IS_EXIT: 'Friend ID exists.',
			},
		},
	},
	CLOUDINARY: {
		KEY: 'Key to access cloudinary',
		SECRET: 'Password to access cloudinary',
		NAME: 'Cloud name of current cloudinary account',
		AVATAR_FOLDER: 'Folder that contain avatar images on cloudinary',
		BUGS_FOLDER: 'Folder that contain bugs images on cloudinary',
		SOLUTIONS_FOLDER: 'Folder that contain solutions images on cloudinary',
	},
};
