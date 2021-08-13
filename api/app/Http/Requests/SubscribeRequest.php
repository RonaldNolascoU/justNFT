<?php

namespace App\Http\Requests;

use App\Rules\ValidTransaction;
use Illuminate\Foundation\Http\FormRequest;

class SubscribeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'creator_id' => 'required|exists:users,_id',
            'transactionId' => ['required'],
            'amount' => 'required',
            'wallet_address' => 'required'
        ];
    }
}
