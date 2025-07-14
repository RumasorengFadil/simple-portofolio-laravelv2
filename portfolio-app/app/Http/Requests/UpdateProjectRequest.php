<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'github_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The project name is required.',
            'description.required' => 'The project description is required.',
            'image.image' => 'The project image must be a valid image file.',
            'image.max' => 'The project image may not be greater than 2MB.',
            'github_url.url' => 'The GitHub URL must be a valid URL.',
            'demo_url.url' => 'The demo URL must be a valid URL.',
        ];
    }
}
