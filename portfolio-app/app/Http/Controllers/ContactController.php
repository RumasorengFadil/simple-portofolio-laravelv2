<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of contact messages (admin).
     */
    public function index()
    {
        $contacts = Contact::latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Contact/Index', [
            'contacts' => $contacts,
            'unreadCount' => Contact::unread()->count(),
        ]);
    }

    /**
     * Show the form for creating a new contact message.
     */
    public function create()
    {
        return Inertia::render('Contact/Create');
    }

    /**
     * Store a newly created contact message.
     */
    public function store(StoreContactRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->route('contact.create')
            ->with('success', 'Thank you for your message! I\'ll get back to you soon.');
    }

    /**
     * Display the specified contact message (admin).
     */
    public function show(Contact $contact)
    {
        // Mark as read when viewed
        if (!$contact->is_read) {
            $contact->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Contact/Show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Mark contact message as read.
     */
    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);

        return redirect()->back()
            ->with('success', 'Message marked as read.');
    }

    /**
     * Remove the specified contact message.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact message deleted successfully!');
    }
}
