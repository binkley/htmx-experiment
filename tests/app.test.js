const request = require('supertest');
const { app, resetTodos } = require('../server');

describe('Advanced HTMX Todo API', () => {
    beforeEach(() => {
        resetTodos();
    });

    it('GET / should return the initial HTML document', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('HTMX Experiment');
        expect(res.text).toContain('id="todo-stats"');
    });

    it('GET /todos should return an empty list and OOB stats initially', async () => {
        const res = await request(app).get('/todos');
        expect(res.status).toBe(200);
        expect(res.text).toContain('id="todo-stats"');
        expect(res.text).toMatch(/Total: 0/);
    });

    it('GET /todos?q=... should filter results', async () => {
        await request(app)
            .post('/todos')
            .send('title=Apple')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        await request(app)
            .post('/todos')
            .send('title=Banana')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        const res = await request(app).get('/todos?q=app');
        expect(res.text).toContain('Apple');
        expect(res.text).not.toContain('Banana');
    });

    it('POST /todos should create a new todo and return HTML with OOB stats', async () => {
        const res = await request(app)
            .post('/todos')
            .send('title=Test Todo')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.status).toBe(200);
        expect(res.text).toContain('Test Todo');
        expect(res.text).toContain('id="todo-stats"');
        expect(res.text).toMatch(/Total: 1/);
    });

    it('POST /todos should return 400 if title is empty', async () => {
        const res = await request(app)
            .post('/todos')
            .send('title=   ')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        expect(res.status).toBe(400);

        const res2 = await request(app)
            .post('/todos')
            .send('')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        expect(res2.status).toBe(400);
    });

    it('GET /todos/:id/edit should return the edit form', async () => {
        await request(app)
            .post('/todos')
            .send('title=To Edit')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        const res = await request(app).get('/todos/1/edit');
        expect(res.status).toBe(200);
        expect(res.text).toContain('<form');
        expect(res.text).toContain('value="To Edit"');

        const res404 = await request(app).get('/todos/999/edit');
        expect(res404.status).toBe(404);
    });

    it('GET /todos/:id should return a single todo item', async () => {
        await request(app)
            .post('/todos')
            .send('title=Single Item')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        const res = await request(app).get('/todos/1');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Single Item');

        const res404 = await request(app).get('/todos/999');
        expect(res404.status).toBe(404);
    });

    it('PUT /todos/:id should update title and return the item', async () => {
        await request(app)
            .post('/todos')
            .send('title=Old Title')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        const res = await request(app)
            .put('/todos/1')
            .send('title=New Title')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        expect(res.status).toBe(200);
        expect(res.text).toContain('New Title');

        const res404 = await request(app)
            .put('/todos/999')
            .send('title=New Title')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        expect(res404.status).toBe(404);
    });

    it('PUT /todos/:id should ignore empty title update', async () => {
        await request(app)
            .post('/todos')
            .send('title=Old Title')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        const res = await request(app)
            .put('/todos/1')
            .send('title=  ')
            .set('Content-Type', 'application/x-www-form-urlencoded');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Old Title'); // Keeps old title
    });

    it('PATCH /todos/:id/toggle should toggle completion state and return OOB stats', async () => {
        await request(app)
            .post('/todos')
            .send('title=To toggle')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        let res = await request(app).patch('/todos/1/toggle');
        expect(res.status).toBe(200);
        expect(res.text).toContain('checked');
        expect(res.text).toMatch(/Completed: 1/);

        res = await request(app).patch('/todos/1/toggle');
        expect(res.status).toBe(200);
        expect(res.text).not.toContain('checked');
        expect(res.text).toMatch(/Completed: 0/);

        const res404 = await request(app).patch('/todos/999/toggle');
        expect(res404.status).toBe(404);
    });

    it('DELETE /todos/:id should remove the todo and return OOB stats', async () => {
        await request(app)
            .post('/todos')
            .send('title=To delete')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        const res = await request(app).delete('/todos/1');
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Total: 0/);
        expect(res.text).not.toContain('To delete');
    });
});
